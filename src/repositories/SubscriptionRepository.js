import Subscription from "../models/Subscription.js";

class SubscriptionRepository {
    async FindByName(service_name, user_id) {
        return await Subscription.findOne({
            where: { service_name, user_id },
        });
    }

    async List(user_id, status, category_id) {
        const where = { user_id };

        if (status) {
            where.status = status;
        }

        if (category_id) {
            where.category_id = category_id;
        }

        return await Subscription.findAll({
            where,
            order: [["next_billing_date", "ASC"]],
        });
    }

    async ListByID(user_id, id) {
        return await Subscription.findOne({
            where: { user_id, id },
        });
    }

    async Create(
        user_id,
        category_id,
        service_name,
        amount,
        billing_cycle,
        next_billing_date
    ) {
        await Subscription.create({
            user_id,
            category_id,
            service_name,
            amount,
            billing_cycle,
            next_billing_date,
        });
    }

    async Edit(
        service_name,
        amount,
        billing_cycle,
        next_billing_date,
        category_id,
        id,
        user_id
    ) {
        await Subscription.update(
            {
                service_name,
                amount,
                billing_cycle,
                next_billing_date,
                category_id,
            },
            { where: { id, user_id } }
        );
    }

    async Cancel(id, user_id) {
        await Subscription.update(
            { status: "canceled" },
            { where: { id, user_id } }
        );
    }

    async UpdateNextBillingDate(id, user_id, next_billing_date) {
        await Subscription.update(
            { next_billing_date },
            { where: { id, user_id } }
        );
    }
}

export default new SubscriptionRepository();
