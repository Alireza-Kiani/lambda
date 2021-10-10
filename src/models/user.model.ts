import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import BaseModel from './base.model';
import { Session } from './session.model';

export enum Privileges {
    ADMIN = 'admin',
    STAFF = 'staff',
    USER = 'user'
}

export class User extends BaseModel {
    @prop({ unique: true, index: true, type: String, required: true })
    public name: string;

    @prop({ type: String, required: true })
    public password: string;

    @prop({ ref: Session })
    public sessions: Ref<Session>[];

    @prop({ enum: Privileges })
    public privilege: Privileges
}

const UserDbModel = getModelForClass(User);

export default UserDbModel;