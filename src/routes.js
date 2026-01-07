import { Router } from "express";
import sequelize from "./config/database.js";
import { ValidateToken } from "./middlewaers/auth.js";
import AuthController from "./controllers/AuthController.js";
import UserController from "./controllers/UserController.js";
import CategoryController from "./controllers/CategoryController.js";
import SubscriptionController from "./controllers/SubscriptionController.js";
import ChargeController from "./controllers/ChargeController.js";
import DashboardController from "./controllers/DashboardController.js";

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

// users
routes.get("/users/profile", ValidateToken, UserController.Get);
routes.put("/users/profile", ValidateToken, UserController.Edit);
routes.delete("/users/profile", ValidateToken, UserController.Delete);

// categories
routes.get("/categories", ValidateToken, CategoryController.List);
routes.post("/categories", ValidateToken, CategoryController.Create);
routes.put("/categories/:id", ValidateToken, CategoryController.Edit);
routes.delete("/categories/:id", ValidateToken, CategoryController.Delete);

// subscriptions
routes.get("/subscriptions", ValidateToken, SubscriptionController.List);
routes.get(
    "/subscriptions/:id",
    ValidateToken,
    SubscriptionController.ListByID
);
routes.post("/subscriptions", ValidateToken, SubscriptionController.Create);
routes.put("/subscriptions/:id", ValidateToken, SubscriptionController.Edit);
routes.patch(
    "/subscriptions/:id/cancel",
    ValidateToken,
    SubscriptionController.Cancel
);

// charges
routes.get("/charges", ValidateToken, ChargeController.List);
routes.get(
    "/subscriptions/:id/charges",
    ValidateToken,
    ChargeController.ListBySubscriptionID
);
routes.post(
    "/subscriptions/:id/charges",
    ValidateToken,
    ChargeController.Create
);
routes.patch("/charges/:id/pay", ValidateToken, ChargeController.PayCharge);

// dashboard
routes.get("/dashboard/summary", ValidateToken, DashboardController.GetSummary);
routes.get("/dashboard/upcoming", ValidateToken, DashboardController.GetUpcoming);

export default routes;
