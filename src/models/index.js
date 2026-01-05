import User from "./User.js";
import Category from "./Category.js";
import Subscription from "./Subscription.js";
import Charge from "./Charge.js";
import Alert from "./Alert.js";

// user
User.hasMany(Category, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
});
Category.belongsTo(User, {
    foreignKey: "user_id",
});

User.hasMany(Subscription, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
});
Subscription.belongsTo(User, {
    foreignKey: "user_id",
});

User.hasMany(Alert, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
});
Alert.belongsTo(User, {
    foreignKey: "user_id",
});

// category
Category.hasMany(Subscription, {
    foreignKey: "category_id",
});
Subscription.belongsTo(Category, {
    foreignKey: "category_id",
});

// subscription
Subscription.hasMany(Charge, {
    foreignKey: "subscription_id",
    onDelete: "CASCADE",
});
Charge.belongsTo(Subscription, {
    foreignKey: "subscription_id",
});

export { User, Category, Subscription, Charge, Alert };
