import Category from "../models/Category.js";

class CategoryRepository {
    async List(user_id) {
        return await Category.findAll({
            where: { user_id },
            // order: [["name", "ASC"]],
        });
    }
    
    async FindByName(name, user_id) {
        return await Category.findOne({
            where: {
                name,
                user_id,
            },
        });
    }

    async Create(user_id, name, color) {
        await Category.create({ user_id, name, color });
    }

    async Edit(id, user_id, name) {
        await Category.update(
            { name },
            {
                where: {
                    id,
                    user_id,
                },
            }
        );
    }

    async Delete(id, user_id) {
        await Category.destroy({
            where: {
                id,
                user_id,
            },
        });
    }
}

export default new CategoryRepository();
