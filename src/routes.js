import { Router } from "express";
import sequelize from "./config/database.js";
import { AuthMiddleware } from "./middlewaers/auth.js";
import AuthController from "./controllers/AuthController.js";
import UserController from "./controllers/UserController.js";
import CategoryController from "./controllers/CategoryController.js";
import SubscriptionController from "./controllers/SubscriptionController.js";
import ChargeController from "./controllers/ChargeController.js";
import DashboardController from "./controllers/DashboardController.js";
import AlertController from "./controllers/AlertController.js";

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
routes.get("/users/profile", AuthMiddleware, UserController.Get);
routes.put("/users/profile", AuthMiddleware, UserController.Edit);
routes.delete("/users/profile", AuthMiddleware, UserController.Delete);

// categories
routes.get("/categories", AuthMiddleware, CategoryController.List);
routes.post("/categories", AuthMiddleware, CategoryController.Create);
routes.put("/categories/:id", AuthMiddleware, CategoryController.Edit);
routes.delete("/categories/:id", AuthMiddleware, CategoryController.Delete);

// subscriptions
routes.get("/subscriptions", AuthMiddleware, SubscriptionController.List);
routes.get(
    "/subscriptions/:id",
    AuthMiddleware,
    SubscriptionController.ListByID
);
routes.post("/subscriptions", AuthMiddleware, SubscriptionController.Create);
routes.put("/subscriptions/:id", AuthMiddleware, SubscriptionController.Edit);
routes.patch(
    "/subscriptions/:id/cancel",
    AuthMiddleware,
    SubscriptionController.Cancel
);

// charges
routes.get("/charges", AuthMiddleware, ChargeController.List);
routes.get(
    "/subscriptions/:id/charges",
    AuthMiddleware,
    ChargeController.ListBySubscriptionID
);
routes.post(
    "/subscriptions/:id/charges",
    AuthMiddleware,
    ChargeController.Create
);
routes.patch("/charges/:id/pay", AuthMiddleware, ChargeController.PayCharge);

// dashboard
routes.get("/dashboard/summary", AuthMiddleware, DashboardController.GetSummary);
routes.get("/dashboard/upcoming", AuthMiddleware, DashboardController.GetUpcoming);

// alerts 
routes.get("/alerts", AuthMiddleware, AlertController.List);
routes.patch("/alerts/:id/read", AuthMiddleware, AlertController.ReadAlert);

export default routes;
