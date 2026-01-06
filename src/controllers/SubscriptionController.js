import SubscriptionService from "../services/SubscriptionService.js";

class SubscriptionController {
    async List(req, res) {
        const user_id = req.user_id;
        const { status, category_id } = req.query;
        const subscriptions = await SubscriptionService.List(
            user_id,
            status,
            category_id
        );
        return res.status(200).json(subscriptions);
    }

    async ListByID(req, res) {
        const user_id = req.user_id;
        const { id } = req.params;
        const subscription = await SubscriptionService.ListByID(user_id, id);
        return res.status(200).json(subscription);
    }

    async Create(req, res) {
        const user_id = req.user_id;
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

    async Edit(req, res) {
        const user_id = req.user_id;
        const { id } = req.params;
        const {
            category_id,
            service_name,
            amount,
            billing_cycle,
            next_billing_date,
        } = req.body;
        await SubscriptionService.Edit(
            service_name,
            amount,
            billing_cycle,
            next_billing_date,
            category_id,
            id,
            user_id
        );
        return res.status(204).send();
    }

    async Cancel(req, res) {
        const user_id = req.user_id;
        const { id } = req.params;
        await SubscriptionService.Cancel(id, user_id);
        return res.status(204).send();
    }
}

export default new SubscriptionController();
