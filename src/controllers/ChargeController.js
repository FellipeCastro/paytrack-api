import ChargeService from "../services/ChargeService.js";

class ChargeController {
    async List(req, res) {
        const user_id = req.user_id;
        const { initial_period, final_period, status } = req.query;
        const charges = await ChargeService.List(
            user_id,
            initial_period,
            final_period,
            status,
        );
        return res.status(200).json(charges);
    }

    async ListBySubscriptionID(req, res) {
        const { id } = req.params;
        const charges = await ChargeService.ListBySubscriptionID(id);
        return res.status(200).json(charges);
    }

    async Create(req, res) {
        const user_id = req.user_id;
        const { id } = req.params;
        await ChargeService.Create(user_id, id);
        return res.status(201).send();
    }

    async PayCharge(req, res) {
        const { id } = req.params;
        await ChargeService.PayCharge(id);
        return res.status(204).send();
    }
}

export default new ChargeController();
