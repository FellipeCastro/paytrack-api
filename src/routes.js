import { Router } from "express";
import sequelize from "./config/database.js";

const routes = Router();

// health check route
routes.get("/health", (req, res) => {
    sequelize
        .authenticate()
        .then(() => {
            res.status(200).json({
                status: "UP",
                message: "Database connection is healthy.",
            });
        })
        .catch((error) => {
            res.status(500).json({
                status: "DOWN",
                message: "Database connection failed.",
                error: error.message,
            });
        });
});

export default routes;
