import { NotFoundError } from "../helpers/ApiErros.js";
import DashboardRepository from "../repositories/DashboardRepository.js";

class DashboardService {
    async GetSummary(user_id, initial_period = null, final_period = null) {
        if (!initial_period && !final_period) {
            const now = new Date();
            const firstDayOfMonth = new Date(
                now.getFullYear(),
                now.getMonth(),
                1
            );
            initial_period = firstDayOfMonth;
            final_period = now;
        }

        const summary = await DashboardRepository.GetSummary(
            user_id,
            initial_period,
            final_period
        );

        if (!summary) {
            throw new NotFoundError("Nenhuma assinatura encontrada.");
        }

        return summary;
    }

    async GetUpcoming(user_id) {
        return await DashboardRepository.GetUpcoming(user_id);
    }
}

export default new DashboardService();
