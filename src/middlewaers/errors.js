const errorMiddleware = (error, req, res, next) => {
    const statusCode = error.statusCode ?? 500;
    const message =
        error.message && error.statusCode
            ? error.message
            : "Erro interno do servidor.";

    // console.log(error);

    return res.status(statusCode).json({ error: message });
};

export default errorMiddleware;
