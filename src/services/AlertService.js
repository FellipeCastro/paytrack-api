import AlertRepository from "../repositories/AlertRepository.js";
import DashboardRepository from "../repositories/DashboardRepository.js";

class AlertService {
    async List(user_id) {
        const upcomingCharges = await DashboardRepository.GetUpcoming(user_id);

        if (upcomingCharges && upcomingCharges.length > 0) {
            for (const upcomingCharge of upcomingCharges) {
                const serviceName = upcomingCharge.Subscription.service_name;
                const nextBillingDate = new Date(
                    upcomingCharge.Subscription.next_billing_date
                );
                const today = new Date();

                // Calcula a diferença em milissegundos
                const differenceMs = nextBillingDate - today;

                // Converte milissegundos para dias
                const leftDays = Math.ceil(
                    differenceMs / (1000 * 60 * 60 * 24)
                );

                const amount = upcomingCharge.amount;

                await AlertRepository.Create(
                    user_id,
                    `Sua assinatura do(a) ${serviceName} será cobrada em ${leftDays} dias (R$ ${amount})`
                );
            }
        }

        return await AlertRepository.List(user_id);
    }

    async ReadAlert(user_id, id) {
        await AlertRepository.ReadAlert(user_id, id);
    }
}

export default new AlertService();
