export default {
    openapi: "3.0.0",
    info: {
        title: "PayTrack API",
        version: "1.0.0",
        description:
            "API para gerenciamento de assinaturas, cobranças e alertas",
    },
    servers: [{ url: "http://localhost:5000" }],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            },
        },
        schemas: {
            // Usuário
            User: {
                type: "object",
                properties: {
                    id: {
                        type: "string",
                        format: "uuid",
                        example: "550e8400-e29b-41d4-a716-446655440000",
                        description: "ID único do usuário",
                    },
                    name: {
                        type: "string",
                        example: "João Silva",
                        description: "Nome do usuário",
                    },
                    email: {
                        type: "string",
                        format: "email",
                        example: "joao@exemplo.com",
                        description: "Email do usuário",
                    },
                    currency: {
                        type: "string",
                        example: "BRL",
                        description: "Moeda preferida do usuário",
                    },
                    notifications_enabled: {
                        type: "boolean",
                        example: true,
                        description: "Indica se notificações estão habilitadas",
                    },
                    created_at: {
                        type: "string",
                        format: "date-time",
                        example: "2024-01-15T10:30:00.000Z",
                        description: "Data de criação do usuário",
                    },
                },
            },
            UserUpdate: {
                type: "object",
                properties: {
                    name: {
                        type: "string",
                        example: "João Silva Santos",
                        description: "Novo nome do usuário",
                    },
                    currency: {
                        type: "string",
                        enum: ["BRL", "USD", "EUR"],
                        example: "USD",
                        description: "Nova moeda preferida",
                    },
                    notifications_enabled: {
                        type: "boolean",
                        example: false,
                        description: "Status das notificações",
                    },
                },
            },

            // Autenticação
            AuthRequest: {
                type: "object",
                required: ["email", "password"],
                properties: {
                    name: {
                        type: "string",
                        example: "João Silva",
                        description: "Nome do usuário (apenas para registro)",
                    },
                    email: {
                        type: "string",
                        format: "email",
                        example: "joao@exemplo.com",
                        description: "Email do usuário",
                    },
                    password: {
                        type: "string",
                        format: "password",
                        example: "senha123",
                        description: "Senha do usuário",
                    },
                },
            },
            AuthResponse: {
                type: "object",
                properties: {
                    token: {
                        type: "string",
                        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                        description: "Token JWT para autenticação",
                    },
                },
            },

            // Categoria
            Category: {
                type: "object",
                properties: {
                    id: {
                        type: "string",
                        format: "uuid",
                        example: "650e8400-e29b-41d4-a716-446655440000",
                        description: "ID único da categoria",
                    },
                    user_id: {
                        type: "string",
                        format: "uuid",
                        example: "550e8400-e29b-41d4-a716-446655440000",
                        description: "ID do usuário dono da categoria",
                    },
                    name: {
                        type: "string",
                        example: "Entretenimento",
                        description: "Nome da categoria",
                    },
                    color: {
                        type: "string",
                        example: "#FF0000",
                        description: "Cor da categoria em formato hexadecimal",
                    },
                    created_at: {
                        type: "string",
                        format: "date-time",
                        example: "2024-01-15T10:30:00.000Z",
                        description: "Data de criação da categoria",
                    },
                },
            },
            CategoryCreate: {
                type: "object",
                required: ["name"],
                properties: {
                    name: {
                        type: "string",
                        example: "Entretenimento",
                        description: "Nome da categoria",
                    },
                    color: {
                        type: "string",
                        example: "#FF0000",
                        description: "Cor da categoria (opcional)",
                    },
                },
            },
            CategoryUpdate: {
                type: "object",
                required: ["name"],
                properties: {
                    name: {
                        type: "string",
                        example: "Streaming",
                        description: "Novo nome da categoria",
                    },
                },
            },

            // Assinatura
            Subscription: {
                type: "object",
                properties: {
                    id: {
                        type: "string",
                        format: "uuid",
                        example: "750e8400-e29b-41d4-a716-446655440000",
                        description: "ID único da assinatura",
                    },
                    user_id: {
                        type: "string",
                        format: "uuid",
                        example: "550e8400-e29b-41d4-a716-446655440000",
                        description: "ID do usuário dono da assinatura",
                    },
                    category_id: {
                        type: "string",
                        format: "uuid",
                        example: "650e8400-e29b-41d4-a716-446655440000",
                        description: "ID da categoria da assinatura",
                    },
                    service_name: {
                        type: "string",
                        example: "Netflix",
                        description: "Nome do serviço",
                    },
                    amount: {
                        type: "number",
                        format: "double",
                        example: 29.9,
                        description: "Valor da assinatura",
                    },
                    billing_cycle: {
                        type: "string",
                        enum: ["monthly", "yearly"],
                        example: "monthly",
                        description: "Ciclo de cobrança",
                    },
                    next_billing_date: {
                        type: "string",
                        format: "date",
                        example: "2024-12-31",
                        description: "Próxima data de cobrança",
                    },
                    status: {
                        type: "string",
                        enum: ["active", "canceled"],
                        example: "active",
                        description: "Status da assinatura",
                    },
                    created_at: {
                        type: "string",
                        format: "date-time",
                        example: "2024-01-15T10:30:00.000Z",
                        description: "Data de criação da assinatura",
                    },
                },
            },
            SubscriptionCreate: {
                type: "object",
                required: [
                    "category_id",
                    "service_name",
                    "amount",
                    "billing_cycle",
                    "next_billing_date",
                ],
                properties: {
                    category_id: {
                        type: "string",
                        format: "uuid",
                        example: "650e8400-e29b-41d4-a716-446655440000",
                        description: "ID da categoria",
                    },
                    service_name: {
                        type: "string",
                        example: "Netflix",
                        description: "Nome do serviço (único por usuário)",
                    },
                    amount: {
                        type: "number",
                        format: "double",
                        minimum: 0.01,
                        example: 29.9,
                        description:
                            "Valor da assinatura (deve ser maior que zero)",
                    },
                    billing_cycle: {
                        type: "string",
                        enum: ["monthly", "yearly"],
                        example: "monthly",
                        description: "Ciclo de cobrança",
                    },
                    next_billing_date: {
                        type: "string",
                        format: "date",
                        example: "2024-12-31",
                        description:
                            "Próxima data de cobrança (deve ser futura)",
                    },
                },
            },
            SubscriptionUpdate: {
                type: "object",
                properties: {
                    category_id: {
                        type: "string",
                        format: "uuid",
                        example: "650e8400-e29b-41d4-a716-446655440000",
                        description: "ID da categoria",
                    },
                    service_name: {
                        type: "string",
                        example: "Netflix Premium",
                        description: "Novo nome do serviço",
                    },
                    amount: {
                        type: "number",
                        format: "double",
                        minimum: 0.01,
                        example: 39.9,
                        description: "Novo valor da assinatura",
                    },
                    billing_cycle: {
                        type: "string",
                        enum: ["monthly", "yearly"],
                        example: "yearly",
                        description: "Novo ciclo de cobrança",
                    },
                    next_billing_date: {
                        type: "string",
                        format: "date",
                        example: "2025-12-31",
                        description: "Nova data de cobrança",
                    },
                },
            },

            // Cobrança
            Charge: {
                type: "object",
                properties: {
                    id: {
                        type: "string",
                        format: "uuid",
                        example: "850e8400-e29b-41d4-a716-446655440000",
                        description: "ID único da cobrança",
                    },
                    subscription_id: {
                        type: "string",
                        format: "uuid",
                        example: "750e8400-e29b-41d4-a716-446655440000",
                        description: "ID da assinatura relacionada",
                    },
                    charge_date: {
                        type: "string",
                        format: "date",
                        example: "2024-12-31",
                        description: "Data da cobrança",
                    },
                    amount: {
                        type: "number",
                        format: "double",
                        example: 29.9,
                        description: "Valor da cobrança",
                    },
                    status: {
                        type: "string",
                        enum: ["pending", "paid"],
                        example: "pending",
                        description: "Status da cobrança",
                    },
                    created_at: {
                        type: "string",
                        format: "date-time",
                        example: "2024-01-15T10:30:00.000Z",
                        description: "Data de criação da cobrança",
                    },
                },
            },

            // Alerta
            Alert: {
                type: "object",
                properties: {
                    id: {
                        type: "string",
                        format: "uuid",
                        example: "950e8400-e29b-41d4-a716-446655440000",
                        description: "ID único do alerta",
                    },
                    user_id: {
                        type: "string",
                        format: "uuid",
                        example: "550e8400-e29b-41d4-a716-446655440000",
                        description: "ID do usuário dono do alerta",
                    },
                    message: {
                        type: "string",
                        example:
                            "Sua assinatura do(a) Netflix será cobrada em 3 dias (R$ 29.90)",
                        description: "Mensagem do alerta",
                    },
                    is_read: {
                        type: "boolean",
                        example: false,
                        description: "Indica se o alerta foi lido",
                    },
                    created_at: {
                        type: "string",
                        format: "date-time",
                        example: "2024-01-15T10:30:00.000Z",
                        description: "Data de criação do alerta",
                    },
                },
            },

            // Dashboard
            DashboardSummary: {
                type: "object",
                properties: {
                    total_monthly: {
                        type: "number",
                        format: "double",
                        example: 129.9,
                        description:
                            "Soma mensal de todas as assinaturas ativas (anual convertida para mensal)",
                    },
                    actives: {
                        type: "integer",
                        example: 3,
                        description: "Número de assinaturas ativas",
                    },
                    avg_amount: {
                        type: "number",
                        format: "double",
                        example: 43.3,
                        description: "Valor médio mensal por assinatura",
                    },
                },
            },

            // Respostas de erro
            ErrorResponse: {
                type: "object",
                properties: {
                    message: {
                        type: "string",
                        example: "Validation failed",
                        description: "Mensagem de erro",
                    },
                    statusCode: {
                        type: "integer",
                        example: 400,
                        description: "Código HTTP de status",
                    },
                },
            },

            // Health Check
            HealthResponse: {
                type: "object",
                properties: {
                    status: {
                        type: "string",
                        enum: ["UP", "DOWN"],
                        example: "UP",
                        description: "Status do serviço",
                    },
                    message: {
                        type: "string",
                        example: "Database connection is healthy.",
                        description: "Mensagem de status",
                    },
                },
            },
        },
    },
    paths: {
        // Health Check
        "/health": {
            get: {
                tags: ["Health"],
                summary: "Health check",
                description:
                    "Verifica se o serviço e conexão com banco de dados estão saudáveis",
                responses: {
                    200: {
                        description: "Serviço está saudável",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/HealthResponse",
                                },
                            },
                        },
                    },
                    500: {
                        description: "Serviço não está saudável",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/HealthResponse",
                                },
                            },
                        },
                    },
                },
            },
        },

        // Autenticação
        "/auth/register": {
            post: {
                tags: ["Autenticação"],
                summary: "Registrar novo usuário",
                description:
                    "Cria uma nova conta de usuário e retorna token JWT",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/AuthRequest",
                            },
                        },
                    },
                },
                responses: {
                    201: {
                        description: "Usuário registrado com sucesso",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/AuthResponse",
                                },
                            },
                        },
                    },
                    400: {
                        description: "Requisição inválida",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ErrorResponse",
                                },
                                examples: {
                                    missingFields: {
                                        value: {
                                            message:
                                                "Todos os campos são obrigatórios.",
                                            statusCode: 400,
                                        },
                                    },
                                    duplicateEmail: {
                                        value: {
                                            message: "Email já cadastrado.",
                                            statusCode: 400,
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },

        "/auth/login": {
            post: {
                tags: ["Autenticação"],
                summary: "Login de usuário",
                description: "Autentica usuário e retorna token JWT",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/AuthRequest",
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "Login realizado com sucesso",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/AuthResponse",
                                },
                            },
                        },
                    },
                    400: {
                        description: "Credenciais inválidas",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ErrorResponse",
                                },
                                examples: {
                                    missingFields: {
                                        value: {
                                            message:
                                                "Email e senha são obrigatórios.",
                                            statusCode: 400,
                                        },
                                    },
                                    invalidCredentials: {
                                        value: {
                                            message: "Email ou senha inválido.",
                                            statusCode: 400,
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },

        // Usuários
        "/users/profile": {
            get: {
                tags: ["Usuários"],
                summary: "Obter perfil do usuário",
                description:
                    "Retorna os dados do usuário autenticado (exceto senha)",
                security: [{ bearerAuth: [] }],
                responses: {
                    200: {
                        description: "Perfil retornado com sucesso",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/User",
                                },
                            },
                        },
                    },
                    401: {
                        description: "Não autenticado",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ErrorResponse",
                                },
                            },
                        },
                    },
                    404: {
                        description: "Usuário não encontrado",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ErrorResponse",
                                },
                            },
                        },
                    },
                },
            },

            put: {
                tags: ["Usuários"],
                summary: "Atualizar perfil do usuário",
                description: "Atualiza os dados do usuário autenticado",
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/UserUpdate",
                            },
                        },
                    },
                },
                responses: {
                    204: {
                        description: "Perfil atualizado com sucesso",
                    },
                    401: {
                        description: "Não autenticado",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ErrorResponse",
                                },
                            },
                        },
                    },
                    404: {
                        description: "Usuário não encontrado",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ErrorResponse",
                                },
                            },
                        },
                    },
                },
            },

            delete: {
                tags: ["Usuários"],
                summary: "Excluir conta do usuário",
                description:
                    "Remove permanentemente a conta do usuário autenticado",
                security: [{ bearerAuth: [] }],
                responses: {
                    204: {
                        description: "Conta excluída com sucesso",
                    },
                    401: {
                        description: "Não autenticado",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ErrorResponse",
                                },
                            },
                        },
                    },
                },
            },
        },

        // Categorias
        "/categories": {
            get: {
                tags: ["Categorias"],
                summary: "Listar categorias do usuário",
                description:
                    "Retorna todas as categorias do usuário autenticado",
                security: [{ bearerAuth: [] }],
                responses: {
                    200: {
                        description: "Categorias listadas com sucesso",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: {
                                        $ref: "#/components/schemas/Category",
                                    },
                                },
                            },
                        },
                    },
                    401: {
                        description: "Não autenticado",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ErrorResponse",
                                },
                            },
                        },
                    },
                },
            },

            post: {
                tags: ["Categorias"],
                summary: "Criar nova categoria",
                description:
                    "Cria uma nova categoria para o usuário autenticado",
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/CategoryCreate",
                            },
                        },
                    },
                },
                responses: {
                    201: {
                        description: "Categoria criada com sucesso",
                    },
                    400: {
                        description: "Requisição inválida",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ErrorResponse",
                                },
                                examples: {
                                    missingName: {
                                        value: {
                                            message:
                                                "O nome da categoria é obrigatório.",
                                            statusCode: 400,
                                        },
                                    },
                                },
                            },
                        },
                    },
                    401: {
                        description: "Não autenticado",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ErrorResponse",
                                },
                            },
                        },
                    },
                    409: {
                        description: "Conflito",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ErrorResponse",
                                },
                                example: {
                                    message:
                                        "Já existe uma categoria com esse nome.",
                                    statusCode: 409,
                                },
                            },
                        },
                    },
                },
            },
        },

        "/categories/{id}": {
            put: {
                tags: ["Categorias"],
                summary: "Atualizar categoria",
                description: "Atualiza o nome de uma categoria existente",
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: {
                            type: "string",
                            format: "uuid",
                        },
                        description: "ID da categoria",
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/CategoryUpdate",
                            },
                        },
                    },
                },
                responses: {
                    204: {
                        description: "Categoria atualizada com sucesso",
                    },
                    400: {
                        description: "Requisição inválida",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ErrorResponse",
                                },
                            },
                        },
                    },
                    401: {
                        description: "Não autenticado",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ErrorResponse",
                                },
                            },
                        },
                    },
                    409: {
                        description: "Conflito",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ErrorResponse",
                                },
                                example: {
                                    message:
                                        "Já existe uma categoria com esse nome.",
                                    statusCode: 409,
                                },
                            },
                        },
                    },
                },
            },

            delete: {
                tags: ["Categorias"],
                summary: "Excluir categoria",
                description: "Remove uma categoria existente",
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: {
                            type: "string",
                            format: "uuid",
                        },
                        description: "ID da categoria",
                    },
                ],
                responses: {
                    204: {
                        description: "Categoria excluída com sucesso",
                    },
                    401: {
                        description: "Não autenticado",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ErrorResponse",
                                },
                            },
                        },
                    },
                },
            },
        },

        // Assinaturas
        "/subscriptions": {
            get: {
                tags: ["Assinaturas"],
                summary: "Listar assinaturas do usuário",
                description:
                    "Retorna assinaturas do usuário autenticado, com filtros opcionais",
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "status",
                        in: "query",
                        required: false,
                        schema: {
                            type: "string",
                            enum: ["active", "canceled"],
                        },
                        description: "Filtrar por status",
                    },
                    {
                        name: "category_id",
                        in: "query",
                        required: false,
                        schema: {
                            type: "string",
                            format: "uuid",
                        },
                        description: "Filtrar por categoria",
                    },
                ],
                responses: {
                    200: {
                        description: "Assinaturas listadas com sucesso",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: {
                                        $ref: "#/components/schemas/Subscription",
                                    },
                                },
                            },
                        },
                    },
                    400: {
                        description: "Requisição inválida",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ErrorResponse",
                                },
                                examples: {
                                    invalidStatus: {
                                        value: {
                                            message:
                                                "Status de assinatura inválido.",
                                            statusCode: 400,
                                        },
                                    },
                                },
                            },
                        },
                    },
                    401: {
                        description: "Não autenticado",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ErrorResponse",
                                },
                            },
                        },
                    },
                },
            },

            post: {
                tags: ["Assinaturas"],
                summary: "Criar nova assinatura",
                description:
                    "Cria uma nova assinatura para o usuário autenticado",
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/SubscriptionCreate",
                            },
                        },
                    },
                },
                responses: {
                    201: {
                        description: "Assinatura criada com sucesso",
                    },
                    400: {
                        description: "Requisição inválida",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ErrorResponse",
                                },
                                examples: {
                                    missingFields: {
                                        value: {
                                            message:
                                                "Todos os campos são obrigatórios.",
                                            statusCode: 400,
                                        },
                                    },
                                    invalidAmount: {
                                        value: {
                                            message:
                                                "O valor da assinatura deve ser maior que zero.",
                                            statusCode: 400,
                                        },
                                    },
                                    invalidDate: {
                                        value: {
                                            message:
                                                "A data do próximo pagamento é inválida.",
                                            statusCode: 400,
                                        },
                                    },
                                    pastDate: {
                                        value: {
                                            message:
                                                "A data do próximo pagamento deve ser uma data futura.",
                                            statusCode: 400,
                                        },
                                    },
                                },
                            },
                        },
                    },
                    401: {
                        description: "Não autenticado",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ErrorResponse",
                                },
                            },
                        },
                    },
                    409: {
                        description: "Conflito",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ErrorResponse",
                                },
                                example: {
                                    message:
                                        "Já existe uma assinatura com esse nome para este usuário.",
                                    statusCode: 409,
                                },
                            },
                        },
                    },
                },
            },
        },

        "/subscriptions/{id}": {
            get: {
                tags: ["Assinaturas"],
                summary: "Obter assinatura específica",
                description: "Retorna os dados de uma assinatura específica",
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: {
                            type: "string",
                            format: "uuid",
                        },
                        description: "ID da assinatura",
                    },
                ],
                responses: {
                    200: {
                        description: "Assinatura retornada com sucesso",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Subscription",
                                },
                            },
                        },
                    },
                    401: {
                        description: "Não autenticado",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ErrorResponse",
                                },
                            },
                        },
                    },
                },
            },

            put: {
                tags: ["Assinaturas"],
                summary: "Atualizar assinatura",
                description: "Atualiza os dados de uma assinatura existente",
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: {
                            type: "string",
                            format: "uuid",
                        },
                        description: "ID da assinatura",
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/SubscriptionUpdate",
                            },
                        },
                    },
                },
                responses: {
                    204: {
                        description: "Assinatura atualizada com sucesso",
                    },
                    400: {
                        description: "Requisição inválida",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ErrorResponse",
                                },
                            },
                        },
                    },
                    401: {
                        description: "Não autenticado",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ErrorResponse",
                                },
                            },
                        },
                    },
                    404: {
                        description: "Assinatura não encontrada",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ErrorResponse",
                                },
                            },
                        },
                    },
                    409: {
                        description: "Conflito",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ErrorResponse",
                                },
                                example: {
                                    message:
                                        "Já existe uma assinatura com esse nome para este usuário.",
                                    statusCode: 409,
                                },
                            },
                        },
                    },
                },
            },
        },

        "/subscriptions/{id}/cancel": {
            patch: {
                tags: ["Assinaturas"],
                summary: "Cancelar assinatura",
                description: "Cancela uma assinatura ativa",
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: {
                            type: "string",
                            format: "uuid",
                        },
                        description: "ID da assinatura",
                    },
                ],
                responses: {
                    204: {
                        description: "Assinatura cancelada com sucesso",
                    },
                    401: {
                        description: "Não autenticado",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ErrorResponse",
                                },
                            },
                        },
                    },
                    404: {
                        description: "Assinatura não encontrada",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ErrorResponse",
                                },
                            },
                        },
                    },
                },
            },
        },

        // Cobranças
        "/charges": {
            get: {
                tags: ["Cobranças"],
                summary: "Listar cobranças",
                description:
                    "Retorna cobranças com filtros opcionais de período e status",
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "initial_period",
                        in: "query",
                        required: false,
                        schema: {
                            type: "string",
                            format: "date",
                        },
                        description: "Data inicial do período (YYYY-MM-DD)",
                    },
                    {
                        name: "final_period",
                        in: "query",
                        required: false,
                        schema: {
                            type: "string",
                            format: "date",
                        },
                        description: "Data final do período (YYYY-MM-DD)",
                    },
                    {
                        name: "status",
                        in: "query",
                        required: false,
                        schema: {
                            type: "string",
                            enum: ["pending", "paid"],
                        },
                        description: "Filtrar por status",
                    },
                ],
                responses: {
                    200: {
                        description: "Cobranças listadas com sucesso",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: {
                                        $ref: "#/components/schemas/Charge",
                                    },
                                },
                            },
                        },
                    },
                    401: {
                        description: "Não autenticado",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ErrorResponse",
                                },
                            },
                        },
                    },
                },
            },
        },

        "/subscriptions/{id}/charges": {
            get: {
                tags: ["Cobranças"],
                summary: "Listar cobranças de uma assinatura",
                description:
                    "Retorna todas as cobranças de uma assinatura específica",
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: {
                            type: "string",
                            format: "uuid",
                        },
                        description: "ID da assinatura",
                    },
                ],
                responses: {
                    200: {
                        description: "Cobranças listadas com sucesso",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: {
                                        $ref: "#/components/schemas/Charge",
                                    },
                                },
                            },
                        },
                    },
                    401: {
                        description: "Não autenticado",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ErrorResponse",
                                },
                            },
                        },
                    },
                },
            },

            post: {
                tags: ["Cobranças"],
                summary: "Criar nova cobrança",
                description:
                    "Cria uma nova cobrança para uma assinatura e atualiza a próxima data de cobrança",
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: {
                            type: "string",
                            format: "uuid",
                        },
                        description: "ID da assinatura",
                    },
                ],
                responses: {
                    201: {
                        description: "Cobrança criada com sucesso",
                    },
                    401: {
                        description: "Não autenticado",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ErrorResponse",
                                },
                            },
                        },
                    },
                    404: {
                        description: "Assinatura não encontrada",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ErrorResponse",
                                },
                            },
                        },
                    },
                    422: {
                        description: "Assinatura cancelada",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ErrorResponse",
                                },
                                example: {
                                    message: "Essa assinatura foi cancelada.",
                                    statusCode: 422,
                                },
                            },
                        },
                    },
                },
            },
        },

        "/charges/{id}/pay": {
            patch: {
                tags: ["Cobranças"],
                summary: "Pagar cobrança",
                description: "Marca uma cobrança como paga",
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: {
                            type: "string",
                            format: "uuid",
                        },
                        description: "ID da cobrança",
                    },
                ],
                responses: {
                    204: {
                        description: "Cobrança paga com sucesso",
                    },
                    400: {
                        description: "Cobrança já paga",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ErrorResponse",
                                },
                                example: {
                                    message: "Essa cobrança já foi paga.",
                                    statusCode: 400,
                                },
                            },
                        },
                    },
                    401: {
                        description: "Não autenticado",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ErrorResponse",
                                },
                            },
                        },
                    },
                    404: {
                        description: "Cobrança não encontrada",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ErrorResponse",
                                },
                            },
                        },
                    },
                },
            },
        },

        // Dashboard
        "/dashboard/summary": {
            get: {
                tags: ["Dashboard"],
                summary: "Obter resumo das assinaturas",
                description:
                    "Retorna estatísticas das assinaturas ativas do usuário",
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "initial_period",
                        in: "query",
                        required: false,
                        schema: {
                            type: "string",
                            format: "date",
                        },
                        description: "Data inicial do período (YYYY-MM-DD)",
                    },
                    {
                        name: "final_period",
                        in: "query",
                        required: false,
                        schema: {
                            type: "string",
                            format: "date",
                        },
                        description: "Data final do período (YYYY-MM-DD)",
                    },
                ],
                responses: {
                    200: {
                        description: "Resumo retornado com sucesso",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/DashboardSummary",
                                },
                            },
                        },
                    },
                    401: {
                        description: "Não autenticado",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ErrorResponse",
                                },
                            },
                        },
                    },
                    404: {
                        description: "Nenhuma assinatura encontrada",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ErrorResponse",
                                },
                                example: {
                                    message: "Nenhuma assinatura encontrada.",
                                    statusCode: 404,
                                },
                            },
                        },
                    },
                },
            },
        },

        "/dashboard/upcoming": {
            get: {
                tags: ["Dashboard"],
                summary: "Obter cobranças próximas",
                description:
                    "Retorna cobranças pendentes com vencimento nos próximos 7 dias",
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "initial_period",
                        in: "query",
                        required: false,
                        schema: {
                            type: "string",
                            format: "date",
                        },
                        description: "Data inicial do período (YYYY-MM-DD)",
                    },
                    {
                        name: "final_period",
                        in: "query",
                        required: false,
                        schema: {
                            type: "string",
                            format: "date",
                        },
                        description: "Data final do período (YYYY-MM-DD)",
                    },
                ],
                responses: {
                    200: {
                        description:
                            "Cobranças próximas retornadas com sucesso",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: {
                                        $ref: "#/components/schemas/Charge",
                                    },
                                },
                            },
                        },
                    },
                    401: {
                        description: "Não autenticado",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ErrorResponse",
                                },
                            },
                        },
                    },
                },
            },
        },

        // Alertas
        "/alerts": {
            get: {
                tags: ["Alertas"],
                summary: "Listar alertas não lidos",
                description:
                    "Retorna alertas não lidos do usuário. Cria automaticamente alertas para cobranças próximas.",
                security: [{ bearerAuth: [] }],
                responses: {
                    200: {
                        description: "Alertas listados com sucesso",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: {
                                        $ref: "#/components/schemas/Alert",
                                    },
                                },
                            },
                        },
                    },
                    401: {
                        description: "Não autenticado",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ErrorResponse",
                                },
                            },
                        },
                    },
                },
            },
        },

        "/alerts/{id}/read": {
            patch: {
                tags: ["Alertas"],
                summary: "Marcar alerta como lido",
                description: "Marca um alerta específico como lido",
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: {
                            type: "string",
                            format: "uuid",
                        },
                        description: "ID do alerta",
                    },
                ],
                responses: {
                    204: {
                        description: "Alerta marcado como lido com sucesso",
                    },
                    401: {
                        description: "Não autenticado",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ErrorResponse",
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    tags: [
        {
            name: "Health",
            description: "Endpoints de health check",
        },
        {
            name: "Autenticação",
            description: "Endpoints de autenticação de usuários",
        },
        {
            name: "Usuários",
            description: "Endpoints de gerenciamento de perfil do usuário",
        },
        {
            name: "Categorias",
            description: "Endpoints de gerenciamento de categorias",
        },
        {
            name: "Assinaturas",
            description: "Endpoints de gerenciamento de assinaturas",
        },
        {
            name: "Cobranças",
            description: "Endpoints de gerenciamento de cobranças",
        },
        {
            name: "Dashboard",
            description: "Endpoints de dashboard e estatísticas",
        },
        {
            name: "Alertas",
            description: "Endpoints de gerenciamento de alertas",
        },
    ],
};
