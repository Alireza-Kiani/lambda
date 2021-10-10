import http from 'http';
import gRPCServer from '../grpc/server';
import { Privileges } from '../models/user.model';
import { User } from '../proto/userPackage/User';
import AuthService from './auth.service';
import Service, { Handler, HandlerRef, MethodSchema } from './service';
import UserService from './user.service';
import CircuitBreaker from 'opossum';

export interface RequestData extends http.IncomingMessage {
    user?: User,
    parsedUrl?: URL,
    clientIp?: string | string[],
    accessToken?: string,
    refreshToken?: string
}
type RequestListener = (req: RequestData, res: http.ServerResponse) => void


export default class BootstrapService extends Service {
    private services: Service[]
    private httpServer: http.Server
    private methods: MethodSchema

    constructor() {
        super('bootstrap');
        this.services = [new UserService(), new AuthService()];
        this.methods = this.services.reduce((prev, curr) => {
            Object.assign(prev, curr.getMethodsList())
            return prev
        }, {});
    }

    getMethodsList() {
        return this.methods
    }

    requestListener: RequestListener = async (req, res) => {
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
                    const user = await (this.services[1] as AuthService).checkAuth(accessToken, req, res);
                    if (!user) {
                        return;
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
            const options = {
                timeout: 1200,
                errorThresholdPercentage: 50,
                resetTimeout: 15000 
            };
            const breaker = new CircuitBreaker(async () => {
                await availableEndpoint.handler(await body(), req, res)
            }, options);
            breaker.fallback(() => {
                res.setHeader('content-type', 'application/json; charset=utf-8');
                res.writeHead(500);
                res.end(JSON.stringify({
                    error: 'Internal Server Error'
                }));
            });
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
            console.log(`HTTP server is running on port ${process.env.HTTP_SERVER_PORT}`);
        });
        await gRPCServer.startServer();
    }
};