import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import gRPCClient from '../grpc/client';
import { JWT } from '../proto/authPackage/JWT';
import { User } from '../proto/userPackage/User';
import { sendUnaryData } from '@grpc/grpc-js';
import jwt from 'jsonwebtoken';
import { Access } from '../proto/authPackage/Access';
import { UserServiceClient } from '../proto/userPackage/UserService';
import UAParser from 'ua-parser-js';
import SessionDbModel, { Session } from '../models/session.model';
import { GenerateTokenRequest } from '../proto/authPackage/GenerateTokenRequest';
import fetch from 'node-fetch';
import UserDbModel from '../models/user.model';
import { Refresh } from '../proto/authPackage/Refresh';
import { PublicKey } from '../proto/authPackage/PublicKey';

export interface CreateUserData {
    name: string,
    password: string
}
export interface UserData extends User {
    sessionId?: string,
    type?: 'refresh' | 'access'
}

class AuthController {
    private promisifiedGetUser(id: string) {
        const client = gRPCClient.getClient().getServiceClient('user') as UserServiceClient;
        return new Promise<User>((resolve, reject) => {
            client.GetUser({
                id
            }, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    }

    public async rsaKeys(): Promise<{ privateKey: string, publicKey: string }> {
        try {
            const privateKey = await fs.readFile(path.resolve(__dirname, '../../asset/private.pem'), { encoding: 'utf-8' });
            const publicKey = await fs.readFile(path.resolve(__dirname, '../../asset/public.pub'), { encoding: 'utf-8' });
            return { privateKey, publicKey };
        } catch (error) {
            const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
                modulusLength: 2048,
                publicKeyEncoding: {
                    type: 'spki',
                    format: 'pem'
                },
                privateKeyEncoding: {
                    type: 'pkcs8',
                    format: 'pem'
                }
            });
            await fs.mkdir(path.resolve(__dirname, '../../asset/'), { recursive: true });
            await fs.writeFile(path.resolve(__dirname, '../../asset/private.pem'), privateKey);
            await fs.writeFile(path.resolve(__dirname, '../../asset/public.pub'), publicKey);
            return { privateKey, publicKey };
        }
    }

    private async generateJwtToken(input: UserData, type: 'refresh' | 'access', session?: Session): Promise<string> {
        const { privateKey } = await this.rsaKeys();
        const token = jwt.sign(
            {
                id: input.id,
                name: input.name,
                createdAt: input.createdAt,
                sessionId: session?._id.toHexString(),
                type
            },
            privateKey,
            {
                algorithm: 'RS256',
                expiresIn: type === 'access' ? 3600 : 3600 * 24 * 7
            }
        )
        return token;
    }

    private async verifyToken(token: string): Promise<UserData> {
        const { privateKey } = await this.rsaKeys();
        const verifiedToken = jwt.verify(token, privateKey, {
            algorithms: ['RS256']
        }) as UserData;
        return verifiedToken;
    }

    private async findLoaction(ip: string) {
        const res = await fetch(`http://ip-api.com/json/${ip}`);
        const result = await res.json();
        return result as {
            country: string,
            city: string
        };
    }

    public async generateToken(input: UserData, userAgent: string, clientIp: string | string[]): Promise<JWT> {
        const parsedUserAgent = UAParser(userAgent);
        const userLocation = await this.findLoaction(clientIp as string);
        const session = await SessionDbModel.create({
            clientIp: clientIp,
            userAgent: parsedUserAgent.ua,
            location: `${userLocation.country}/${userLocation.city}`
        });
        await UserDbModel.findByIdAndUpdate(input.id, {
            $push: {
                sessions: session
            }
        });
        const jwt: JWT = {
            accessToken: await this.generateJwtToken(input, 'access', session),
            refreshToken: await this.generateJwtToken(input, 'refresh', session),
            expiresIn: 3600,
            tokenType: 'bearer'
        }
        return jwt;
    }

    public async generateTokenGrpc(input: GenerateTokenRequest, cb: sendUnaryData<JWT>) {
        try {
            const jwt: JWT = await this.generateToken(input.user, input.userAgent, input.clientIp);
            cb(null, jwt);
        } catch (error) {
            cb(error, null);
        }
    }

    public async checkAuth(access: Access): Promise<User> {
        const payload = await this.verifyToken(access.accessToken);
        const foundUser = await this.promisifiedGetUser(payload.id);
        return foundUser;
    }

    public async checkAuthGrpc(access: Access, cb: sendUnaryData<User>) {
        try {
            const foundUser = await this.checkAuth(access);
            cb(null, foundUser);
        } catch (error) {
            cb(error, null);
        }
    }

    public async refreshToken(refreshToken: string): Promise<JWT> {
        try {
            const payload = await this.verifyToken(refreshToken);
            if (payload) {
                if (payload.type !== 'refresh') {
                    throw new Error('Type of token is invalid');
                }
                let session: Session = null
                if (payload.sessionId) {
                    session = await SessionDbModel.findById(payload.sessionId)
                }
                const jwt: JWT = {
                    accessToken: await this.generateJwtToken(payload, 'access', session),
                    refreshToken: await this.generateJwtToken(payload, 'refresh', session),
                    expiresIn: 3600,
                    tokenType: 'bearer'
                }
                return jwt;
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    public async refreshTokenGrpc(token: Refresh, cb: sendUnaryData<JWT>) {
        try {
            const jwt = await this.refreshToken(token.refreshToken);
            cb(null, jwt);
        } catch (error) {
            cb(error, null);
        }
    }

    public async getPublicKey(): Promise<string> {
        const { publicKey } = await this.rsaKeys();
        return publicKey;
    }

    public async getPublicKeyGrpc(cb: sendUnaryData<PublicKey>) {
        try {
            const { publicKey } = await this.rsaKeys();
            cb(null, { publicKey });
        } catch (error) {
            cb(error, null);
        }
    }
}

export default AuthController;