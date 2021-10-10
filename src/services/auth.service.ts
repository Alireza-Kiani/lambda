import path from 'path';
import { loadSync } from '@grpc/proto-loader';
import Service, { Handler, MethodSchema } from './service';
import gRPCServer from '../grpc/server';
import { loadPackageDefinition } from '@grpc/grpc-js';
import protoOptions from '../proto/options';
import { ProtoGrpcType } from '../proto/auth';
import { AuthServiceHandlers } from '../proto/authPackage/AuthService';
import AuthController, { UserData } from '../controllers/auth.controller';
import { User } from '../proto/userPackage/User';

export default class AuthService extends Service {
    private methods: MethodSchema

    constructor() {
        super('auth');
        this.methods = {
            [this.restEndpointGenerator('POST /generate-token')]: {
                auth: false,
                handler: this.generateToken
            },
            [this.restEndpointGenerator('POST /refresh-token')]: {
                auth: false,
                handler: this.refreshToken
            },
            'checkAuth': {
                auth: false,
                handler: this.checkAuth
            }
        };
        const packageDefinition = loadSync(path.resolve(__dirname, '../proto/auth.proto'), protoOptions);
        const authProto = (loadPackageDefinition(packageDefinition) as unknown) as ProtoGrpcType;
        gRPCServer.getInstance().getServer().addService(authProto.authPackage.AuthService.service, {
            GenerateToken: (input, cb) => {
                new AuthController().generateTokenGrpc({
                    ...input.request
                }, cb);
            },
            CheckAuth: (input, cb) => {
                new AuthController().checkAuthGrpc({
                    accessToken: input.request.accessToken
                }, cb);
            },
            RefreshToken: (input, cb) => {
                new AuthController().refreshTokenGrpc({
                    refreshToken: input.request.refreshToken
                }, cb);
            }
        } as AuthServiceHandlers);
    }

    generateToken: Handler = async (body, req, res) => {
        res.setHeader('content-type', 'application/json; charset=utf-8');
        try {
            const userInput: UserData = JSON.parse(body);
            const newUser = await new AuthController().generateToken(userInput, req.headers['user-agent'], req.clientIp);
            res.writeHead(200);
            res.end(JSON.stringify(newUser));
        } catch (error) {
            console.log(error);
            res.writeHead(500);
            res.end(JSON.stringify({
                error: error?.message ? error.message : 'Internal Server Error'
            }));
        }
    }
    
    checkAuth: Handler<User> = async (accessToken, req, res) => {
        try {
            const user = await new AuthController().checkAuth({ accessToken });
            req.user = user;
            return user;
        } catch (error) {
            res.setHeader('content-type', 'application/json; charset=utf-8');
            res.writeHead(401);
            res.end(JSON.stringify({
                error: error?.message ? error.message : 'Not Authenticated'
            }));
            return null;
        }
    }

    refreshToken: Handler = async (_, req, res) => {
        res.setHeader('content-type', 'application/json; charset=utf-8');
        try {
            const jwt = await new AuthController().refreshToken(req.refreshToken);
            res.writeHead(200);
            res.end(JSON.stringify(jwt));
        } catch (error) {
            res.setHeader('content-type', 'application/json; charset=utf-8');
            res.writeHead(401);
            res.end(JSON.stringify({
                error: error?.message ? error.message : 'Not Authenticated'
            }));
            return null;
        }
    }

    getMethodsList() {
        return this.methods;
    }
}