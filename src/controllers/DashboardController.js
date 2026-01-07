import DashboardService from "../services/DashboardService.js";

class DashboardController {
    async GetSummary(req, res) {
        const user_id = req.user_id;
        const { initial_period, final_period } = req.query;

        const summary = await DashboardService.GetSummary(
            user_id,
            initial_period,
            final_period
        );

        return res.status(200).json(summary);
    }

    async GetUpcoming(req, res) {
        const user_id = req.user_id;
        const { initial_period, final_period } = req.query;

        const upcoming = await DashboardService.GetUpcoming(
            user_id,
            initial_period,
            final_period
        );

        return res.status(200).json(upcoming);
    }
}

export default new DashboardController();
