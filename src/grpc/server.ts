import { Server, ServerCredentials } from '@grpc/grpc-js';

class gRPCServer {
    private serverInstance: Server;
    private static classInstance: gRPCServer;

    constructor(instance: Server) {
        this.serverInstance = instance;
    }

    public static getInstance(): gRPCServer {
        if (this.classInstance) {
            return this.classInstance;
        }
        this.classInstance = new gRPCServer(new Server());
        return this.classInstance;
    }

    public getServer(): Server {
        return this.serverInstance;
    }

    public static async startServer(): Promise<void> {
        if (this.classInstance) {
            gRPCServer.getInstance();
        }
        const bind = () => new Promise((resolve, reject) => {
            this.classInstance.getServer().bindAsync(
                '127.0.0.1:50050',
                ServerCredentials.createInsecure(),
                (err, port) => {
                    if (err) {
                        reject(err);
                    }
                    console.log("gRPC server is running at http://127.0.0.1:50050");
                    this.classInstance.getServer().start();
                    resolve(port);
                }
            )
        });
        try {
            await bind();
        } catch (error) {
            console.log(error);
        }
    }
}

export default gRPCServer;