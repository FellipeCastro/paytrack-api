import { Router } from "express";
import sequelize from "./config/database.js";
import { ValidateToken } from "./middlewaers/auth.js";
import AuthController from "./controllers/AuthController.js";
import UserController from "./controllers/UserController.js";

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

// user
routes.get("/users/profile", ValidateToken, UserController.Get);
routes.put("/users/profile", ValidateToken, UserController.Edit);
routes.delete("/users/profile", ValidateToken, UserController.Delete);

export default routes;
