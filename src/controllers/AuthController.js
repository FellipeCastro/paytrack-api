import AuthService from "../services/AuthService.js";

class AuthController {
    async Register(req, res) {
        const { name, email, password } = req.body;

        const token = await AuthService.Register(
            name,
            email,
            password
        );

        return res.status(201).json(token);
    }

    async Login(req, res) {
        const { email, password } = req.body;

        const token = await AuthService.Login(email, password);

        return res.status(200).json(token);
    }
}

export default new AuthController();
