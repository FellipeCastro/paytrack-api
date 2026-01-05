import { Router } from "express";
import sequelize from "./config/database.js";
import AuthController from "./controllers/AuthController.js";

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

// auth
routes.post("/auth/register", AuthController.Register);
routes.post("/auth/login", AuthController.Login);

export default routes;
