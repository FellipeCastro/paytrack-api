import AlertService from "../services/AlertService.js";

class AlertController {
    async List(req, res) {
        const user_id = req.user_id;
        const alerts = await AlertService.List(user_id);
        return res.status(200).json(alerts);
    }

    async ReadAlert(req, res) {
        const user_id = req.user_id;
        const { id } = req.params;
        await AlertService.ReadAlert(user_id, id);
        return res.status(204).send();
    }
}

export default new AlertController();
