import Service, { MethodSchema, Handler } from './service';
import path from 'path';
import gRPCServer from '../grpc/server';
import { loadPackageDefinition } from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';
import protoOptions from '../proto/options';
import { ProtoGrpcType } from '../proto/user';
import { UserServiceHandlers } from '../proto/userPackage/UserService';
import UserController, { CreateUserData, EditUserPayload, LoginUserData } from '../controllers/user.controller';
import { User } from '../proto/userPackage/User';
import { Privileges } from '../models/user.model';

export default class UserService extends Service {
    private methods: MethodSchema

    constructor() {
        super('user');
        this.methods = {
            [this.restEndpointGenerator('POST /create')]: {
                auth: true,
                privileges: [Privileges.ADMIN],
                handler: this.createNewUser
            },
            [this.restEndpointGenerator('POST /login')]: {
                auth: false,
                handler: this.loginUser
            },
            [this.restEndpointGenerator('GET /')]: {
                auth: true,
                privileges: [Privileges.ADMIN, Privileges.STAFF, Privileges.USER],
                handler: this.getUser
            },
            [this.restEndpointGenerator('PATCH /edit')]: {
                auth: true,
                privileges: [Privileges.ADMIN, Privileges.STAFF, Privileges.USER],
                handler: this.editUser
            },
            [this.restEndpointGenerator('DELETE /')]: {
                auth: true,
                privileges: [Privileges.ADMIN],
                handler: this.deleteUser
            }
        };
        const packageDefinition = loadSync(path.resolve(__dirname, '../proto/user.proto'), protoOptions);
        const userProto = (loadPackageDefinition(packageDefinition) as unknown) as ProtoGrpcType;
        gRPCServer.getInstance().getServer().addService(userProto.userPackage.UserService.service, {
            CreateNewUser: (input, cb) => {
                new UserController().createNewUserGrpc({
                    name: input.request.name,
                    password: input.request.password,
                }, cb);
            },
            LoginUser: (input, cb) => {
                new UserController().loginUserGrpc({
                    user: input.request.user,
                    userAgent: input.request.userAgent
                }, cb);
            },
            GetUser: (input, cb) => {
                new UserController().getUserByIdGrpc({
                    id: input.request.id
                }, cb);
            },
            GetUsers: (input, cb) => {
                new UserController().getUsersGrpc(cb);
            },
            EditUser: (input, cb) => {
                new UserController().editUserGrpc({
                    id: input.request.id,
                    payload: input.request.payload
                }, cb);
            },
            DeleteUser: (input, cb) => {
                new UserController().deleteUserGrpc({
                    id: input.request.id
                }, cb);
            }
        } as UserServiceHandlers);
    }

    createNewUser: Handler = async (body, req, res) => {
        try {
            const userInput: CreateUserData = JSON.parse(body);
            const newUserWithToken = await new UserController().createNewUser(userInput);
            res.send(201, newUserWithToken);
        } catch (error) {
            console.log(error);
            res.send(500, {
                error: error?.message ? error.message : 'Internal Server Error'
            });
        }
    }

    loginUser: Handler = async (body, req, res) => {
        try {
            const userInput: LoginUserData = JSON.parse(body);
            const foundUser = await new UserController().loginUser(userInput, req.headers['user-agent'], req.clientIp);
            res.send(200, foundUser);
        } catch (error) {
            console.log(error);
            res.send(500, {
                error: error?.message ? error.message : 'Internal Server Error'
            });
        }
    }

    getUser: Handler<User> = async (body, req, res) => {
        try {
            const id = req.parsedUrl.searchParams.get('id');
            if (!id) {
                let users = await new UserController().getUsers();
                users = users.filter(user => user.id !== req.user.id);
                res.send(200, {
                    self: req.user,
                    others: users
                });
                return;
            }
            const user = await new UserController().getUserById(id);
            if (!user) {
                throw new Error('User Not Found');
            }
            res.send(200, user);
        } catch (error) {
            console.log(error);
            res.send(404, {
                error: 'User Not Found'
            });
        }
    }
    
    editUser: Handler<User> = async (body, req, res) => {
        try {
            const id = req.parsedUrl.searchParams.get('id');
            const editPayload: EditUserPayload = JSON.parse(body);
            let targetUser: User;
            if (id) {
                targetUser = await new UserController().getUserById(id);
            }
            if (
                (
                    req.user.privilege === Privileges.USER &&
                    (req.user.id !== id || editPayload.privilege || editPayload.name)
                ) || (
                    req.user.privilege === Privileges.STAFF &&
                    (editPayload.privilege || (targetUser && targetUser.privilege === Privileges.ADMIN))
                )
            ) {
                throw new Error('Insufficient Permission');
            }
            const updatedUser = await new UserController().editUser(id ? id : req.user.id, editPayload);
            res.send(200, updatedUser);
        } catch (error) {
            console.log(error);
            res.send(400, {
                error: error?.message ? error.message : 'Bad Request'
            });
        }
    }

    deleteUser: Handler<User> = async (body, req, res) => {
        try {
            const id = req.parsedUrl.searchParams.get('id');
            if (!id) {
                throw new Error('Please Provide An Id');
            }
            const user = await new UserController().deleteUser(id);
            res.send(200, {
                ...user
            });
        } catch (error) {
            console.log(error);
            res.send(400, {
                error: 'Bad Request'
            });
        }
    }

    getMethodsList() {
        return this.methods;
    }
}