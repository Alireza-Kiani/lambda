import http from 'http';
import { Privileges } from '../models/user.model';
import { RequestData } from './bootstrap.service';

export type Handler<T = unknown> = (body: string, req: RequestData, res: http.ServerResponse) => void | Promise<void> | T | Promise<T>
export type HandlerRef<T = unknown> = () => void | Promise<void> | T | Promise<T>

export type MethodSchema = Record<string, {
    auth: boolean,  
    handler: Handler,
    privileges?: Privileges[]
}>

export default abstract class Service {
    protected name: string;
    protected static version = Number(process.env.API_VERSION);
    protected static apiIdentifier = `/api/v${Service.version}`;

    constructor(name: string) {
        this.name = name;
    }
    abstract getMethodsList(): MethodSchema
    restEndpointGenerator(url: string): string {
        const splitted = url.split(' ');
        const method = splitted[0];
        let path = splitted[1];
        if (!path.endsWith('/')) {
            path += '/';
        }
        return `${method} ${Service.apiIdentifier}/${this.name}${path}`;
    }
};