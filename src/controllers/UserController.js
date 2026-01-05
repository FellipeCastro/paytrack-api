import UserService from "../services/UserService.js";

class UserController {
    async Get(req, res) {
        const user_id = req.user_id;
        const result = await UserService.Get(user_id);
        return res.status(200).json(result);
    }

    async Edit(req, res) {
        const user_id = req.user_id;
        const { name, currency, notifications_enabled } = req.body;
        await UserService.Edit(user_id, name, currency, notifications_enabled);
        return res.status(204).send();
    }

    async Delete(req, res) {
        const user_id = req.user_id;
        await UserService.Delete(user_id);
        return res.status(204).send();
    }
}

export default new UserController();
