import CategoryService from "../services/CategoryService.js";

class CategoryController {
    async List(req, res) {
        const user_id = req.user_id;
        const categories = await CategoryService.List(user_id);
        return res.status(200).json(categories);
    }
    
    async Create(req, res) {
        const user_id = req.user_id;
        const { name, color } = req.body;
        await CategoryService.Create(user_id, name, color);
        return res.status(201).send();
    }

    async Edit(req, res) {
        const user_id = req.user_id;
        const { id } = req.params;
        const { name } = req.body;
        await CategoryService.Edit(id, user_id, name);
        return res.status(204).send();
    }

    async Delete(req, res) {
        const user_id = req.user_id;
        const { id } = req.params;
        await CategoryService.Delete(id, user_id);
        return res.status(204).send();
    }
}

export default new CategoryController();
