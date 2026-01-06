import SubscriptionService from "../services/SubscriptionService.js";

class SubscriptionController {
    async Create(req, res) {
        user_id = req.user.id;
        const {
            category_id,
            service_name,
            amount,
            billing_cycle,
            next_billing_date,
        } = req.body;
        await SubscriptionService.Create(
            user_id,
            category_id,
            service_name,
            amount,
            billing_cycle,
            next_billing_date
        );
        return res.status(201).send();
    }
}

export default new SubscriptionController();
