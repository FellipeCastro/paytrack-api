export class ApiError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

// uso geral para parâmetros faltantes ou inválidos
export class BadRequestError extends ApiError {
    constructor(message) {
        super(message, 400);
    }
}

// falta de autenticação (token ausente/inválido)
export class UnauthorizedError extends ApiError {
    constructor(message) {
        super(message, 401);
    }
}

// recurso não existe
export class NotFoundError extends ApiError {
    constructor(message) {
        super(message, 404);
    }
}

// conflito/duplicação
export class ConflictError extends ApiError {
    constructor(message) {
        super(message, 409);
    }
}

// validação semântica que não é sintaticamente inválida
export class UnprocessableEntityError extends ApiError {
    constructor(message) {
        super(message, 422);
    }
}
