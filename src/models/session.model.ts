import { prop, getModelForClass } from '@typegoose/typegoose';
import BaseModel from './base.model';

export class Session extends BaseModel {
    @prop({ type: String })
    public clientIp?: string;

    @prop({ type: String })
    public location?: string;

    @prop({ type: String })
    public userAgent?: string;
}

const SessionDbModel = getModelForClass(Session);

export default SessionDbModel;