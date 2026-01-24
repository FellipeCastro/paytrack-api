import bcrypt from "bcryptjs";
import AuthRepository from "../repositories/AuthRepository.js";
import { BadRequestError } from "../helpers/ApiErros.js";
import { CreateToken } from "../middlewares/auth.js";

class AuthService {
    async Register(name, email, password) {
        if (!name || !email || !password) {
            throw new BadRequestError("Todos os campos são obrigatórios.");
        }

        const formattedEmail = email.toLowerCase().trim();

        const existingUser = await AuthRepository.FindByEmail(formattedEmail);
        if (existingUser) {
            throw new BadRequestError("Email já cadastrado.");
        }

        const password_hash = await bcrypt.hash(password, 10);

        const result = await AuthRepository.Register(
            name,
            formattedEmail,
            password_hash,
        );

        const token = CreateToken(result.id);
        return { token };
    }

    async Login(email, password) {
        if (!email || !password) {
            throw new BadRequestError("Email e senha são obrigatórios.");
        }

        const formattedEmail = email.toLowerCase().trim();

        const user = await AuthRepository.FindByEmail(formattedEmail);
        if (!user || !(await bcrypt.compare(password, user.password_hash))) {
            throw new BadRequestError("Email ou senha inválido.");
        }

        const token = CreateToken(user.id);
        return { token };
    }
}

export default new AuthService();
