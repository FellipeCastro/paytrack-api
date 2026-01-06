import { BadRequestError } from "../helpers/ApiErros.js";
import SubscriptionRepository from "../repositories/SubscriptionRepository.js";

class SubscriptionService {
    async Create(
        user_id,
        category_id,
        service_name,
        amount,
        billing_cycle,
        next_billing_date
    ) {
        if (!category_id || !service_name || !amount || !billing_cycle || !next_billing_date) {
            throw new BadRequestError("Todos os campos são obrigatórios.");
        }

        if (amount < 0) {
            throw new BadRequestError("O valor da assinatura deve ser maior que zero.");
        }

        if (next_billing_date <= new Date()) {
            throw new BadRequestError("A data do próximo pagamento deve ser uma data futura.");
        }

        await SubscriptionRepository.Create(
            user_id,
            category_id,
            service_name,
            amount,
            billing_cycle,
            next_billing_date
        );
    }
}

export default new SubscriptionService();
