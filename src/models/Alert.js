import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Alert = sequelize.define(
    "Alert",
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
        message: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        is_read: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        tableName: "alerts",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: false,
    }
);

export default Alert;
