import User from "../models/User.js";

class AuthRepository {
    async Register(name, email, password_hash) {
        return await User.create({
            name,
            email,
            password_hash,
        });
    }

    async FindByEmail(email) {
        return await User.findOne({ where: { email } });
    }
}

export default new AuthRepository();
