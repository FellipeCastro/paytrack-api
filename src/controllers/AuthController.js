import { BadRequestError } from "../helpers/ApiErros.js";
import AuthService from "../services/AuthService.js";

class AuthController {
    async Register(req, res) {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            throw new BadRequestError("Todos os campos são obrigatórios."); 
        }

        const formattedEmail = email.toLowerCase().trim();

        const result = await AuthService.Register(
            name,
            formattedEmail,
            password
        );

        return res.status(201).json(result);
    }

    async Login(req, res) {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new BadRequestError("Email e senha são obrigatórios.");
        }

        const formattedEmail = email.toLowerCase().trim();

        const result = await AuthService.Login(formattedEmail, password);

        return res.status(200).json(result);
    }
}

export default new AuthController();
