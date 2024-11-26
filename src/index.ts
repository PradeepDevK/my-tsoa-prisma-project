import express from 'express';
import { RegisterRoutes } from './routes/routes';
import bodyParser from 'body-parser';
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./swagger/swagger.json";

const app = express();
const port = 3000;

app.use(bodyParser.json());
RegisterRoutes(app);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`Swagger docs available at http://localhost:${port}/docs`);
});