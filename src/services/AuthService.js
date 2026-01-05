import bcrypt from "bcryptjs";
import AuthRepository from "../repositories/AuthRepository.js";
import { BadRequestError } from "../helpers/ApiErros.js";
import { CreateToken } from "../middlewaers/auth.js";

class AuthService {
    async Register(name, email, password) {
        const existingUser = await AuthRepository.FindByEmail(email);
        if (existingUser) {
            throw new BadRequestError("Email já cadastrado.");
        }

        const password_hash = await bcrypt.hash(password, 10);
        
        const result = await AuthRepository.Register(
            name,
            email,
            password_hash
        );

        const token = CreateToken(result.id);
        
        return {
            name: result.name,
            email: result.email,
            token,
        };
    }

    async Login(email, password) {
        const user = await AuthRepository.FindByEmail(email);
        if (!user || !(await bcrypt.compare(password, user.password_hash))) {
            throw new BadRequestError("Credenciais inválidas.");
        }

        const token = CreateToken(user.id);
        return {
            name: user.name,
            email: user.email,
            token,
        };
    }
}


export default new AuthService();
