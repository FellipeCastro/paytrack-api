import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Subscription = sequelize.define(
    "Subscription",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "users",
                key: "id",
            },
        },
        category_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "categories",
                key: "id",
            },
        },
        service_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: {
                min: 0.01,
            },
        },
        billing_cycle: {
            type: DataTypes.ENUM("monthly", "yearly"),
            allowNull: false,
        },
        next_billing_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM("active", "canceled"),
            defaultValue: "active",
        },
    },
    {
        tableName: "subscriptions",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: false,
    }
);

export default Subscription;
