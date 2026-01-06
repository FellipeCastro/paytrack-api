import Subscription from "../models/Subscription.js";

class SubscriptionRepository {
    async Create(
        user_id,
        category_id,
        service_name,
        amount,
        billing_cycle,
        next_billing_date
    ) {
        await Subscription.create(
            user_id,
            category_id,
            service_name,
            amount,
            billing_cycle,
            next_billing_date
        );
    }
}

export default new SubscriptionRepository();
