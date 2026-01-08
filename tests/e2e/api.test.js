import {
    expect,
    test,
    describe,
    beforeAll,
    beforeEach,
    afterAll,
} from "vitest";
import request from "supertest";
import app from "../../src/app.js";
import sequelize from "../../src/config/database.js";
// import models 

// Dados de teste

// Configuração do ambiente de teste
const setupTestEnvironment = async () => {
    if (process.env.NODE_ENV !== "test") {
        process.env.NODE_ENV = "test";
        console.log("Ambiente configurado para testes");
    }

    try {
        await sequelize.authenticate();
        console.log("Conexão com banco estabelecida");
    } catch (error) {
        console.error("Erro ao conectar ao banco:", error.message);
        throw error;
    }
};

const cleanupDatabase = async () => {
    console.log("Limpando banco de dados...");

    // limpar banco
    // await Transaction.destroy({
    //     where: {},
    //     truncate: true,
    //     cascade: true,
    //     force: true,
    // });

    // inserir dados de teste
    // await Transaction.bulkCreate(testTransactions);
    // console.log(
    //     `Dados de teste inseridos: ${testTransactions.length}`
    // );
};

const closeDatabaseConnection = async () => {
    try {
        await sequelize.close();
        console.log("Conexão com banco encerrada");
    } catch (error) {
        console.error("Erro ao encerrar conexão:", error.message);
    }
};

// Funções auxiliares


// Testes
describe("API E2E Test Suite", () => {
    beforeAll(setupTestEnvironment);
    beforeEach(cleanupDatabase);
    afterAll(closeDatabaseConnection);

    describe("Health Check", () => {
        test("GET /health deve retornar status 200", async () => {
            const response = await request(app).get("/health");

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("status", "UP");
            expect(response.body).toHaveProperty(
                "message",
                "Database connection is healthy."
            );
        });
    });
});
