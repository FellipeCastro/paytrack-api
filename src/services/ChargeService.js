import {
    BadRequestError,
    NotFoundError,
    UnprocessableEntityError,
} from "../helpers/ApiErros.js";
import AlertRepository from "../repositories/AlertRepository.js";
import ChargeRepository from "../repositories/ChargeRepository.js";
import SubscriptionRepository from "../repositories/SubscriptionRepository.js";

class ChargeService {
    async List(user_id, initial_period, final_period, status) {
        return await ChargeRepository.List(
            user_id,
            initial_period,
            final_period,
            status,
        );
    }

    async ListBySubscriptionID(subscription_id) {
        return await ChargeRepository.ListBySubscriptionID(subscription_id);
    }

    async Create(user_id, subscription_id) {
        const subscription = await SubscriptionRepository.ListByID(
            user_id,
            subscription_id,
        );
        if (!subscription) {
            throw new NotFoundError("Essa assinatura não existe.");
        }

        if (subscription.status === "canceled") {
            throw new UnprocessableEntityError(
                "Essa assinatura foi cancelada.",
            );
        }

        const charge_date = new Date();
        const amount = subscription.amount;
        const serviceName = subscription.service_name;

        await ChargeRepository.Create(subscription_id, charge_date, amount);

        const next_billing_date = new Date(subscription.next_billing_date);

        if (subscription.billing_cycle === "monthly") {
            next_billing_date.setMonth(next_billing_date.getMonth() + 1);
        } else {
            next_billing_date.setFullYear(next_billing_date.getFullYear() + 1);
        }

        await SubscriptionRepository.UpdateNextBillingDate(
            subscription_id,
            user_id,
            next_billing_date,
        );

        // alerts
        await AlertRepository.Create(
            user_id,
            `Nova cobrança registrada para ${serviceName} no valor de R$ ${amount}`,
        );
    }

    async PayCharge(id) {
        const charge = await ChargeRepository.ListByID(id);
        if (!charge) {
            throw new NotFoundError("Essa cobrança não existe.");
        }

        if (charge.status === "paid") {
            throw new BadRequestError("Essa cobrança já foi paga.");
        }

        await ChargeRepository.PayCharge(id);
    }
}

export default new ChargeService();
