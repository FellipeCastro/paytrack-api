import { Op } from "sequelize";
import sequelize from "../config/database.js";
import Subscription from "../models/Subscription.js";
import Charge from "../models/Charge.js";

class DashboardRepository {
    async GetSummary(user_id, initial_period, final_period) {
        const where = { user_id, status: "active" };

        // Filtro por período
        if (initial_period && final_period) {
            where.created_at = {
                [Op.between]: [
                    new Date(initial_period),
                    new Date(final_period),
                ],
            };
        } else if (initial_period) {
            where.created_at = {
                [Op.gte]: new Date(initial_period),
            };
        } else if (final_period) {
            where.created_at = {
                [Op.lte]: new Date(final_period),
            };
        }

        const result = await Subscription.findOne({
            attributes: [
                [
                    sequelize.fn(
                        "SUM",
                        sequelize.literal(
                            `CASE 
                                WHEN "billing_cycle" = 'monthly' THEN "amount"
                                WHEN "billing_cycle" = 'yearly' THEN "amount" / 12.0
                                ELSE 0
                            END`
                        )
                    ),
                    "total_monthly",
                ],
                [
                    sequelize.literal(
                        `COUNT(CASE WHEN "Subscription"."status" = 'active' THEN 1 END)`
                    ),
                    "actives",
                ],
                [
                    sequelize.fn(
                        "AVG",
                        sequelize.literal(
                            `CASE 
                                WHEN "billing_cycle" = 'monthly' THEN "amount"
                                WHEN "billing_cycle" = 'yearly' THEN "amount" / 12.0
                                ELSE NULL
                            END`
                        )
                    ),
                    "avg_amount",
                ],
            ],
            where,
            raw: true,
        });

        return (
            result || {
                total_monthly: 0,
                actives: 0,
                avg_amount: 0,
            }
        );
    }

    async GetUpcoming(user_id, daysAhead = 7) {
        const today = new Date();
        const futureDate = new Date();
        futureDate.setDate(today.getDate() + daysAhead);

        return await Charge.findAll({
            include: [
                {
                    model: Subscription,
                    as: "Subscription",
                    where: {
                        status: "active",
                        user_id,
                        next_billing_date: {
                            [Op.between]: [today, futureDate],
                        },
                    },
                    attributes: ["service_name", "next_billing_date"],
                },
            ],
            where: {
                status: "pending",
            },
        });
    }
}

export default new DashboardRepository();
