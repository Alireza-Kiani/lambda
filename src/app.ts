import BootstrapService from './services/bootstrap.service';
import connectToDb from './db/connection';

(async () => {
    await connectToDb();
    await new BootstrapService().startHttpServer();
})();
