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

const ValidateToken = (req, res, next) => {
    const authToken = req.headers.authorization;

    if (!authToken) {
        throw new UnauthorizedError("Token não fornecido.");
    }

    const token = authToken.split(" ")[1];

    jwt.verify(token, secret, (error, tokenDecoded) => {
        if (error) {
            throw new UnauthorizedError("Token inválido.");
        }

        req.user_id = tokenDecoded.user_id;

        next();
    });
};

export { CreateToken, ValidateToken };
