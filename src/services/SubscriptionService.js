import {
    BadRequestError,
    ConflictError,
    NotFoundError,
} from "../helpers/ApiErros.js";
import AlertRepository from "../repositories/AlertRepository.js";
import SubscriptionRepository from "../repositories/SubscriptionRepository.js";

class SubscriptionService {
    async ValidateSubscriptionData(
        service_name,
        amount,
        next_billing_date,
        user_id,
    ) {
        const existingSubscription = await SubscriptionRepository.FindByName(
            service_name,
            user_id,
        );

        if (existingSubscription) {
            throw new ConflictError(
                "Já existe uma assinatura com esse nome para este usuário.",
            );
        }

        if (amount < 0) {
            throw new BadRequestError(
                "O valor da assinatura deve ser maior que zero.",
            );
        }

        if (
            typeof next_billing_date !== "string" ||
            isNaN(Date.parse(next_billing_date))
        ) {
            throw new BadRequestError(
                "A data do próximo pagamento é inválida.",
            );
        }

        if (new Date(next_billing_date) <= new Date()) {
            throw new BadRequestError(
                "A data do próximo pagamento deve ser uma data futura.",
            );
        }
    }

    async List(user_id, status, category_id) {
        if (status && !["active", "canceled"].includes(status)) {
            throw new BadRequestError("Status de assinatura inválido.");
        }

        if (!status) {
            status = null;
        }

        if (!category_id) {
            category_id = null;
        }

        return await SubscriptionRepository.List(user_id, status, category_id);
    }

    async ListByID(user_id, id) {
        return await SubscriptionRepository.ListByID(user_id, id);
    }

    async Create(
        user_id,
        category_id,
        service_name,
        amount,
        billing_cycle,
        next_billing_date,
    ) {
        if (
            !category_id ||
            !service_name ||
            !amount ||
            !billing_cycle ||
            !next_billing_date
        ) {
            throw new BadRequestError("Todos os campos são obrigatórios.");
        }

        await this.ValidateSubscriptionData(
            service_name,
            amount,
            next_billing_date,
            user_id,
        );

        await SubscriptionRepository.Create(
            user_id,
            category_id,
            service_name,
            amount,
            billing_cycle,
            next_billing_date,
        );
    }

    async Edit(
        service_name,
        amount,
        billing_cycle,
        next_billing_date,
        category_id,
        id,
        user_id,
    ) {
        const subscription = await SubscriptionRepository.ListByID(user_id, id);

        if (!subscription) {
            throw new NotFoundError("Assinatura não encontrada.");
        }

        if (!service_name) {
            service_name = subscription.service_name;
        }

        if (!amount) {
            amount = subscription.amount;
        }

        if (!billing_cycle) {
            billing_cycle = subscription.billing_cycle;
        }

        if (!next_billing_date) {
            next_billing_date = subscription.next_billing_date;
        }

        if (!category_id) {
            category_id = subscription.category_id;
        }

        await this.ValidateSubscriptionData(
            service_name,
            amount,
            next_billing_date,
            user_id,
        );

        await SubscriptionRepository.Edit(
            service_name,
            amount,
            billing_cycle,
            next_billing_date,
            category_id,
            id,
            user_id,
        );
    }

    async Cancel(id, user_id) {
        const subscription = await SubscriptionRepository.ListByID(user_id, id);

        if (!subscription) {
            throw new NotFoundError("Assinatura não encontrada.");
        }
        await SubscriptionRepository.Cancel(id, user_id);

        const serviceName = subscription.service_name;

        await AlertRepository.Create(
            user_id,
            `Sua assinatura do(a) ${serviceName} foi cancelada.`,
        );
    }
}

export default new SubscriptionService();
