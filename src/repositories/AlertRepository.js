import Alert from "../models/Alert.js";

class AlertRepository {
    async Create(user_id, message) {
        await Alert.create({
            user_id,
            message,
        });
    }

    async List(user_id) {
        return await Alert.findAll({
            where: { user_id, is_read: false },
            order: [["created_at", "ASC"]],
        });
    }

    async ReadAlert(user_id, id) {
        await Alert.update({ is_read: true }, { where: { user_id, id } });
    }
}

export default new AlertRepository();
