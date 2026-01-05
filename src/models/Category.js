import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Category = sequelize.define(
    "Category",
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
            }
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        color: {
            type: DataTypes.STRING(20),
        },
    },
    {
        tableName: "categories",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: false,
    }
);

export default Category;
