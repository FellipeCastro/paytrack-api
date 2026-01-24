import jwt from "jsonwebtoken";
import "dotenv/config";
import { UnauthorizedError } from "../helpers/ApiErros.js";

const secret = process.env.TOKEN_SECRET;

const CreateToken = (user_id) => {
    const token = jwt.sign({ user_id }, secret, {
        expiresIn: "7d",
    });

    return token;
};

const AuthMiddleware = (req, res, next) => {
    try {
        const authToken = req.headers.authorization;

        if (!authToken) {
            return next(new UnauthorizedError("Token não fornecido."));
        }

        const token = authToken.split(" ")[1];

        jwt.verify(token, secret, (error, tokenDecoded) => {
            if (error) {
                return next(new UnauthorizedError("Token inválido."));
            }

            req.user_id = tokenDecoded.user_id;
            next();
        });
    } catch (error) {
        next(error);
    }
};

export { CreateToken, AuthMiddleware };
