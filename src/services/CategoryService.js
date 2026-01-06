import { BadRequestError, ConflictError } from "../helpers/ApiErros.js";
import CategoryRepository from "../repositories/CategoryRepository.js";

class CategoryService {
    async List(user_id) {
        return await CategoryRepository.List(user_id);
    }
    
    async Create(user_id, name, color) {        
        if (!name || name.trim() === "") {
            throw new BadRequestError("O nome da categoria é obrigatório.");
        }

        const existingCategory = await CategoryRepository.FindByName(name, user_id);
        if (existingCategory) {
            throw new ConflictError("Já existe uma categoria com esse nome.");
        }

        await CategoryRepository.Create(user_id, name, color);
    }

    async Edit(id, user_id, name) {
        if (!name || name.trim() === "") {
            throw new BadRequestError("O nome da categoria é obrigatório.");
        }
        const existingCategory = await CategoryRepository.FindByName(name, user_id);
        if (existingCategory && existingCategory.id !== id) {
            throw new ConflictError("Já existe uma categoria com esse nome.");
        }

        await CategoryRepository.Edit(id, user_id, name);
    }

    async Delete(id, user_id) {
        await CategoryRepository.Delete(id, user_id);
    }
}

export default new CategoryService();
