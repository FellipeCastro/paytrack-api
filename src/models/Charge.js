import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Charge = sequelize.define(
    "Charge",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        subscription_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "subscriptions",
                key: "id",
            },
        },
        charge_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: {
                min: 0.01,
            },
        },
        status: {
            type: DataTypes.ENUM("pending", "paid"),
            defaultValue: "pending",
        },
    },
    {
        tableName: "charges",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: false,
    }
);

export default Charge;
