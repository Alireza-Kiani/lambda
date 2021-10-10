import UserDbModel from '../../models/user.model';
import bcrypt from 'bcryptjs';

(async () =>  {
    const users = await UserDbModel.find();
    if (!users.length) {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(process.env.FIRST_ADMIN_PASSWORD, salt);
        UserDbModel.create({
            name: 'su',
            password: hash,
            privilege: 'admin'
        });
    }
})();