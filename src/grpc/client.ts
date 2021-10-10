import { loadPackageDefinition, credentials } from '@grpc/grpc-js';
import path from 'path';
import { loadSync } from '@grpc/proto-loader';
import { ProtoGrpcType as UserGrpcType } from '../proto/user';
import { ProtoGrpcType as AuthGrpcType } from '../proto/auth';
import protoOptions from '../proto/options';
import { UserServiceClient } from '../proto/userPackage/UserService';
import { AuthServiceClient } from '../proto/authPackage/AuthService';

type ProtoServiceNames = 'user' | 'auth';

interface ProtoList {
    protoName: string,
    filePath: string,
    package: 'userPackage' | 'authPackage',
    service: 'UserService' | 'AuthService'
}

type ServiceClient = UserServiceClient | AuthServiceClient

class gRPCClient {
    private clientInstance: Map<ProtoServiceNames, ServiceClient>;
    private static instance: gRPCClient;

    constructor(protoName: ProtoServiceNames, clientInstance: ServiceClient) {
        this.clientInstance = new Map<ProtoServiceNames, UserServiceClient>();
        this.clientInstance.set(protoName, clientInstance)
    }

    public getServiceClient(protoName: ProtoServiceNames = 'user'): ServiceClient {
        return this.clientInstance.get(protoName);
    }

    public setClient(protoName: ProtoServiceNames, clientInstance: ServiceClient): void {
        this.clientInstance.set(protoName, clientInstance);
    }

    public static getClient() {
        if (this.instance) {
            return this.instance;
        }
        const protoLists: ProtoList[] = [
            {
                protoName: 'user',
                filePath: '../proto/user.proto',
                package: 'userPackage',
                service: 'UserService'
            },
            {
                protoName: 'auth',
                filePath: '../proto/auth.proto',
                package: 'authPackage',
                service: 'AuthService'
            }
        ];
        for (const protoPath of protoLists) {
            const packageDefinition = loadSync(path.resolve(__dirname, protoPath.filePath), protoOptions);
            let protoObject = null;
            let client = null;
            if (protoPath.package === 'authPackage') {
                protoObject = (loadPackageDefinition(packageDefinition) as unknown) as AuthGrpcType;
                console.log(process.env.AUTH_SERVICE_GRPC_HOST);
                client = new protoObject.authPackage.AuthService(
                    process.env.AUTH_SERVICE_GRPC_HOST || '127.0.0.1:50050',
                    credentials.createInsecure()
                );
            } else if (protoPath.package === 'userPackage') {
                protoObject = (loadPackageDefinition(packageDefinition) as unknown) as UserGrpcType;
                client = new protoObject.userPackage.UserService(
                    process.env.USER_SERVICE_GRPC_HOST || '127.0.0.1:50050',
                    credentials.createInsecure()
                );
            }
            if (this.instance) {
                this.instance.setClient('auth', client);
            } else {
                this.instance = new gRPCClient('user', client);
            }

            const deadline = new Date();
            deadline.setSeconds(deadline.getSeconds() + 5)
            client.waitForReady(deadline, (err) => {
                if (err) {
                    console.error(err)
                    return
                }
                console.log(`${protoPath.protoName} - gRPC client connected`);
            })
        }
        return this.instance;
    }
}

export default gRPCClient;