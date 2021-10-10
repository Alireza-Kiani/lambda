import { sendUnaryData } from '@grpc/grpc-js';
import gRPCClient from '../grpc/client';
import UserDbModel, { User, Privileges } from '../models/user.model';
import { User as ProtoUser } from '../proto/userPackage/User';
import bcrpyt from 'bcryptjs';
import { TokenWithUser } from '../proto/userPackage/TokenWithUser';
import { AuthServiceClient } from '../proto/authPackage/AuthService';
import { JWT } from '../proto/authPackage/JWT';
import { UserId } from '../proto/userPackage/UserId';
import { EditUserRequest } from '../proto/userPackage/EditUserRequest';
import { LoginUserRequest } from '../proto/userPackage/LoginUserRequest';
import { NewUser } from '../proto/userPackage/NewUser';

export interface CreateUserData {
    name: string,
    password: string,
    privilege?: Privileges
}
export interface LoginUserData extends CreateUserData {}

export interface EditUserPayload {
    name?: string,
    password?: string
    privilege?: string
}

class UserController {
    private generateTokenClientCall(data: ProtoUser, userAgent: string, clientIp: string | string[]) {
        const client = gRPCClient.getClient().getServiceClient('auth') as AuthServiceClient;
        return new Promise<JWT>((resolve, reject) => {
            client.GenerateToken({
                user: data,
                userAgent,
                clientIp: clientIp as string
            }, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    }

    private prepareGrpcResponse(user: User): ProtoUser {
        const userWithVersion = user as User & { __v: number };
        return {
            id: user._id.toHexString(),
            name: user.name,
            privilege: user.privilege,
            createdAt: user.createdAt.toISOString(),
            v: userWithVersion.__v
        };
    }

    private async hashPassword(password: string): Promise<string> {
        const salt = await bcrpyt.genSalt();
        const hashedPassword = await bcrpyt.hash(password, salt);
        return hashedPassword;
    }

    public async createNewUser(input: CreateUserData): Promise<ProtoUser> {
        try {
            const hashedPassword = await this.hashPassword(input.password);
            const newUser = await UserDbModel.create({
                name: input.name,
                password: hashedPassword,
                privilege: input.privilege ? input.privilege : Privileges.USER
            });
            return this.prepareGrpcResponse(newUser);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    public async createNewUserGrpc(input: CreateUserData, cb: sendUnaryData<ProtoUser>) {
        try {
            const user = await this.createNewUser(input);
            cb(null, user);
        } catch (error) {
            cb(error, null);
        }
    }

    public async loginUser(input: NewUser, userAgent: string, clientIp: string | string[]): Promise<TokenWithUser> {
        try {
            const foundUser = await UserDbModel.findOne({
                name: input.name
            });
            if (!foundUser) {
                throw new Error('Username or password is invalid');
            }
            const isPasswordValid = await bcrpyt.compare(input.password, foundUser.password);
            if (!isPasswordValid) {
                throw new Error('Username or password is invalid');
            }
            const token = await this.generateTokenClientCall(this.prepareGrpcResponse(foundUser), userAgent, clientIp)
            return {
                user: this.prepareGrpcResponse(foundUser),
                token
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    public async loginUserGrpc(input: LoginUserRequest, cb: sendUnaryData<TokenWithUser>) {
        try {
            const { user, token } = await this.loginUser(input.user, input.userAgent, input.clientIp);
            cb(null, { user, token });
        } catch (error) {
            cb(error, null);
        }
    }

    public async getUserById(id: string) {
        if (id) {
            return this.prepareGrpcResponse(await UserDbModel.findById(id));
        }
        return null;
    }

    public async getUserByIdGrpc(user: UserId, cb: sendUnaryData<ProtoUser>) {
        try {
            const foundUser = await this.getUserById(user.id);
            cb(null, foundUser);
        } catch (error) {
            cb(error, null);
        }
    }

    public async editUser(id: string, payload: EditUserPayload): Promise<ProtoUser> {
        if (id) {
            const updateFields: EditUserPayload = {};
            switch (true) {
                case !!payload.password: {
                    updateFields.password = await this.hashPassword(payload.password);
                }
                case !!payload.name: {
                    updateFields.name = payload.name;
                }
                case !!payload.privilege: {
                    updateFields.privilege = payload.privilege;
                }
            }
            const update = {
                $set: {
                    ...updateFields
                },
                $inc: {
                    __v: 1
                }
            };
            const updateOptions = {
                new: true
            };
            // Versioning consistency
            const currentUser = await UserDbModel.findById(id);
            try {
                const updatedUser = await UserDbModel.findOneAndUpdate({
                    _id: id,
                    __v: currentUser.__v
                }, update, updateOptions);
                return this.prepareGrpcResponse(updatedUser);
            } catch (error) {
                return null;                    
            }
        }
        return null;
    }

    public async editUserGrpc(input: EditUserRequest, cb: sendUnaryData<ProtoUser>) {
        try {
            const updatedUser = await this.editUser(input.id, input.payload);
            cb(null, updatedUser);
        } catch (error) {
            cb(error, null);
        }
    }

    public async deleteUser(id: string): Promise<ProtoUser> {
        if (id) {
            const deletedUser = await UserDbModel.findByIdAndDelete(id);
            return this.prepareGrpcResponse(deletedUser);
        }
        return null;
    }

    public async deleteUserGrpc(user: UserId, cb: sendUnaryData<ProtoUser>) {
        try {
            const deletedUser = await this.deleteUser(user.id);
            cb(null, deletedUser);
        } catch (error) {
            cb(error, null);
        }
    }
}

export default UserController;