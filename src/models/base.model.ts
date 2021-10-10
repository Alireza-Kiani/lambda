import { defaultClasses } from '@typegoose/typegoose';

interface BaseModel extends defaultClasses.Base {};

class BaseModel extends defaultClasses.TimeStamps {
    static async initialization(): Promise<void> {}

    static async migrations(): Promise<void> {}
};

export default BaseModel;