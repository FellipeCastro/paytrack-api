import AlertRepository from "../repositories/AlertRepository.js";
import DashboardRepository from "../repositories/DashboardRepository.js";

class AlertService {
    async List(user_id) {
        // Retorna apenas os alertas não lidos do banco de dados
        // Alertas de próximas cobranças são criados quando charges são registradas
        return await AlertRepository.List(user_id);
    }

    async ReadAlert(user_id, id) {
        await AlertRepository.ReadAlert(user_id, id);
    }
}

export default new AlertService();
