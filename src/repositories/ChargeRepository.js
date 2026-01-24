import { Op } from "sequelize";
import Charge from "../models/Charge.js";
import Subscription from "../models/Subscription.js";

class ChargeRepository {
    async ListByID(id) {
        return await Charge.findOne({
            where: { id },
        });
    }

    async List(user_id, initial_period, final_period, status) {
        const where = {
            "$Subscription.user_id$": user_id,
        };

        // Filtro por período (charge_date entre initial_period e final_period)
        if (initial_period && final_period) {
            where.charge_date = {
                [Op.between]: [
                    new Date(initial_period),
                    new Date(final_period),
                ],
            };
        }
        // Filtro apenas data inicial (charge_date >= initial_period)
        else if (initial_period) {
            where.charge_date = {
                [Op.gte]: new Date(initial_period),
            };
        }
        // Filtro apenas data final (charge_date <= final_period)
        else if (final_period) {
            where.charge_date = {
                [Op.lte]: new Date(final_period),
            };
        }

        if (status) {
            where.status = status;
        }

        return await Charge.findAll({
            where,
            include: [
                {
                    model: Subscription,
                    attributes: [],
                    required: true,
                },
            ],
            order: [["charge_date", "DESC"]],
        });
    }

    async ListBySubscriptionID(subscription_id) {
        return await Charge.findAll({
            where: { subscription_id },
            order: [["charge_date", "DESC"]],
        });
    }

    async Create(subscription_id, charge_date, amount) {
        await Charge.create({ subscription_id, charge_date, amount });
    }

    async PayCharge(id) {
        await Charge.update({ status: "paid" }, { where: { id } });
    }
}

export default new ChargeRepository();
