import http from 'http';
import { Privileges } from '../models/user.model';
import { User } from '../proto/userPackage/User';
import AuthService from './auth.service';
import Service, { MethodSchema } from './service';
import { User as ProtoUser } from '../proto/userPackage/User';
import UserService from './user.service';
import CircuitBreaker from 'opossum';
import gRPCClient from '../grpc/client';
import { AuthServiceClient } from '../proto/authPackage/AuthService';

export interface RequestData extends http.IncomingMessage {
    user?: User,
    parsedUrl?: URL,
    clientIp?: string | string[],
    accessToken?: string,
    refreshToken?: string
}

export interface ResponseData extends http.ServerResponse {
    send: (statusCode: number, data: any) => any
}

type RequestListener = (req: RequestData, res: ResponseData) => void

export enum Services {
    ALL = 'all',
    USER = 'user',
    AUTH = 'auth'
}
export default class BootstrapService extends Service {
    private services: Service[]
    private httpServer: http.Server
    private methods: MethodSchema
    private circuitBreakerOptions: {
        timeout: number,
        errorThresholdPercentage: number,
        resetTimeout: number
    }

    constructor(services: Services = Services.ALL) {
        super('bootstrap');
        switch (services) {
            case 'all': {
                this.services = [new UserService(), new AuthService()];
                break;
            }
            case 'user': {
                this.services = [new UserService()];
                break;
            }
            case 'auth': {
                this.services = [new AuthService()];
                break;
            }
        }
        console.log(this.services);
        this.methods = this.services.reduce((prev, curr) => {
            Object.assign(prev, curr.getMethodsList())
            return prev
        }, {});
        this.circuitBreakerOptions = {
            timeout: 1200,
            errorThresholdPercentage: 50,
            resetTimeout: 15000
        };
    }

    getMethodsList() {
        return this.methods
    }

    private checkAuthClientCall(accessToken: string) {
        const client = gRPCClient.getClient().getServiceClient('auth') as AuthServiceClient;
        return new Promise<ProtoUser>((resolve, reject) => {
            client.checkAuth({
                accessToken
            }, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    }

    private fallbackStrategy(res: http.ServerResponse) {
        res.setHeader('content-type', 'application/json; charset=utf-8');
        res.writeHead(500);
        res.end(JSON.stringify({
            error: 'Sorry we are currently down'
        }));
        return;
    }

    requestListener: RequestListener = async (req, res) => {
        function sendReadableData(this: http.ServerResponse, statusCode: number, data: any) {
            let humanReadableData = data
            if (typeof data === 'object') {
                humanReadableData = JSON.stringify(data)
                this.setHeader('content-type', 'application/json; charset=utf-8');
            }

            this.writeHead(statusCode);
            this.end(humanReadableData);
        }
        res.send = sendReadableData.bind(res);

        const url = new URL(req.url, `http://${req.headers.host}`);
        req.clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress
        req.parsedUrl = url;
        let restEndpoint = `${req.method} ${url.pathname}`;
        if (!restEndpoint.endsWith('/')) {
            restEndpoint += '/';
        }
        const body = () => new Promise<string>((resolve, reject) => {
            let data = '';
            req.on('data', (chunk) => {
                data += chunk;
            });
            req.on('end', () => {
                resolve(data);
            });
        });
        const availableEndpoint = this.methods[restEndpoint];
        if (availableEndpoint) {
            req.refreshToken = req.headers['refresh-token'] ? (req.headers['refresh-token'] as string).replace('Bearer ', '') : null;
            if (availableEndpoint.auth) {
                const bearerToken = req.headers.authorization as string;
                if (bearerToken && bearerToken.startsWith('Bearer ')) {
                    const accessToken = bearerToken.slice(7);

                    let user: User = null
                    const authCheckBreaker = new CircuitBreaker(async () => {
                        try {
                            user = await this.checkAuthClientCall(accessToken);
                            if (!user) {
                                return;
                            }
                        } catch (error) {
                            console.log(error);
                            return;
                        }
                    }, this.circuitBreakerOptions);
                    authCheckBreaker.fallback(this.fallbackStrategy);

                    try {
                        await authCheckBreaker.fire();
                    } catch (error) {
                        console.log(error);
                    }

                    if (availableEndpoint.privileges && !availableEndpoint.privileges.includes(user.privilege as Privileges)) {
                        res.setHeader('content-type', 'application/json; charset=utf-8');
                        res.writeHead(401);
                        res.end(JSON.stringify({
                            error: 'Insufficient Permission'
                        }));
                        return;
                    }
                    req.accessToken = accessToken;
                } else {
                    res.setHeader('content-type', 'application/json; charset=utf-8');
                    res.writeHead(401);
                    res.end(JSON.stringify({
                        error: 'Not Authenticated'
                    }));
                    return;
                }
            }

            const breaker = new CircuitBreaker(async () => {
                await availableEndpoint.handler(await body(), req, res)
            }, this.circuitBreakerOptions);
            breaker.fallback(this.fallbackStrategy);
            try {
                await breaker.fire();
            } catch (error) {
                console.log(error);
            }
        } else {
            res.writeHead(404);
            res.end('Not Found');
        }
    }

    async startHttpServer() {
        this.httpServer = http.createServer(this.requestListener);
        this.httpServer.listen(process.env.PORT || process.env.HTTP_SERVER_PORT || 3000, () => {
            console.log(`HTTP server is running on port ${process.env.PORT || process.env.HTTP_SERVER_PORT || 3000}`);
        });
    }
};