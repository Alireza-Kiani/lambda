import mongoose from 'mongoose';
import models from '../models/models';

const connectToDb = async () => {
    const mongoPrefix = process.env.MONGO_PREFIX;
    const mongoUser = process.env.MONGO_USER;
    const mongoPassword = process.env.MONGO_PASSWORD;
    const mongoHost = process.env.MONGO_HOST;
    const mongoPort = process.env.MONGO_PORT;
    const mongoDbName = process.env.MONGO_DB_NAME;
    const mongoAuthDb = process.env.MONGO_DB_AUTH;

    let uri = `${mongoPrefix}://`;
    if (mongoUser && mongoPassword) {
        uri += `${mongoUser}:${mongoPassword}@`;
    }
    uri += `${mongoHost}`;
    if (mongoPort && mongoPort !== '') {
        uri += `:${mongoPort}`;
    }
    uri += `/${mongoDbName}?retryWrites=true&w=majority`;
    if (mongoAuthDb) {
        uri += `&authSource=${mongoAuthDb}`
    }
    async function connect() {
        try {
            await mongoose.connect(uri);
            for (let i = 0; i < models.length; i++) {
                const model = models[i];
                await model.initialization();
                await model.migrations();
                await import('./seeders/addAdmin');
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    await connect();
    mongoose.connection.on('disconnected', connect);

}

export default connectToDb;