import { Router } from "express";
import sequelize from "./config/database.js";
import { AuthMiddleware } from "./middlewares/auth.js";
import AuthController from "./controllers/AuthController.js";
import UserController from "./controllers/UserController.js";
import CategoryController from "./controllers/CategoryController.js";
import SubscriptionController from "./controllers/SubscriptionController.js";
import ChargeController from "./controllers/ChargeController.js";
import DashboardController from "./controllers/DashboardController.js";
import AlertController from "./controllers/AlertController.js";

const router = Router();

// health check route
router.get("/health", (req, res) => {
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
router.post("/auth/register", AuthController.Register);
router.post("/auth/login", AuthController.Login);

// users
router.get("/users/profile", AuthMiddleware, UserController.Get);
router.put("/users/profile", AuthMiddleware, UserController.Edit);
router.delete("/users/profile", AuthMiddleware, UserController.Delete);

// categories
router.get("/categories", AuthMiddleware, CategoryController.List);
router.post("/categories", AuthMiddleware, CategoryController.Create);
router.put("/categories/:id", AuthMiddleware, CategoryController.Edit);
router.delete("/categories/:id", AuthMiddleware, CategoryController.Delete);

// subscriptions
router.get("/subscriptions", AuthMiddleware, SubscriptionController.List);
router.get(
    "/subscriptions/:id",
    AuthMiddleware,
    SubscriptionController.ListByID,
);
router.post("/subscriptions", AuthMiddleware, SubscriptionController.Create);
router.put("/subscriptions/:id", AuthMiddleware, SubscriptionController.Edit);
router.patch(
    "/subscriptions/:id/cancel",
    AuthMiddleware,
    SubscriptionController.Cancel,
);

// charges
router.get("/charges", AuthMiddleware, ChargeController.List);
router.get(
    "/subscriptions/:id/charges",
    AuthMiddleware,
    ChargeController.ListBySubscriptionID,
);
router.post(
    "/subscriptions/:id/charges",
    AuthMiddleware,
    ChargeController.Create,
);
router.patch("/charges/:id/pay", AuthMiddleware, ChargeController.PayCharge);

// dashboard
router.get(
    "/dashboard/summary",
    AuthMiddleware,
    DashboardController.GetSummary,
);
router.get(
    "/dashboard/upcoming",
    AuthMiddleware,
    DashboardController.GetUpcoming,
);

// alerts
router.get("/alerts", AuthMiddleware, AlertController.List);
router.patch("/alerts/:id/read", AuthMiddleware, AlertController.ReadAlert);

export default router;
