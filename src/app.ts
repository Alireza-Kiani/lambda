import BootstrapService, { Services } from './services/bootstrap.service';
import connectToDb from './db/connection';
import gRPCServer from './grpc/server';

(async () => {
    const service = process.argv[2];
    let targetService = Services.ALL;
    if (service) {
        const serviceName = service.split('=')[1];
        if (Object.keys(Services).includes(serviceName.toUpperCase())) {
            targetService = serviceName as Services;
        }
    }
    await connectToDb();
    await new BootstrapService(targetService).startHttpServer();
    await gRPCServer.startServer();
})();
