import User from "../models/User.js";

class UserRepository {
    async Get(user_id) {
        return await User.findByPk(user_id, {
            attributes: { exclude: ["password_hash"] },
        });
    }

    async Edit(user_id, name, currency, notifications_enabled) {
        await User.update(
            { name, currency, notifications_enabled },
            {
                where: { id: user_id },
            }
        );
    }

    async Delete(user_id) {
        await User.destroy({ where: { id: user_id } });
    }

    async FindByID(user_id) {
        return await User.findOne({ where: { id: user_id } });
    }
}

export default new UserRepository();
