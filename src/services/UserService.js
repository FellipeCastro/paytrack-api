import { NotFoundError } from "../helpers/ApiErros.js";
import UserRepository from "../repositories/UserRepository.js";

class UserService {
    async Get(user_id) {
        const user = await UserRepository.Get(user_id);
        if (!user) {
            throw new NotFoundError("Usuário não encontrado.");
        }
        return user;
    }

    async Edit(user_id, name, currency, notifications_enabled) {
        const user = await UserRepository.FindByID(user_id);
        if (!name) {
            name = user.name;
        }
        if (!currency) {
            currency = user.currency;
        }
        if (notifications_enabled === undefined) {
            notifications_enabled = user.notifications_enabled;
        }

        await UserRepository.Edit(
            user_id,
            name,
            currency,
            notifications_enabled
        );
    }

    async Delete(user_id) {
        await UserRepository.Delete(user_id);
    }
}

export default new UserService();
