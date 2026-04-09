import express from "express";
import cors from "cors";  // ← NOVA IMPORTAÇÃO
import router from "./routes";
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger';

function createApp() {
    const app = express();

    // ← ADICIONAR CORS
    app.use(cors({
        origin: "http://localhost:5173",
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization", "X-API-Key"]
    }));

    app.use(express.json())
    app.use("/api", router);
    
    //rota documentaçao
    app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    return app;
}

export default createApp;