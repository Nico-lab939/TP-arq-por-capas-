import express from "express";
import swaggerUi from "swagger-ui-express";
import connectDB from "./config/database.js";
import { swaggerSpec } from "./config/swagger.js";
import dogRoutes from "./routes/dogRoutes.js";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.json({
    mensaje: "API CRUD de Perros - Arquitectura por Capas",
    documentacion: "http://localhost:3000/api-docs",
    endpoints: {
      listar: "GET /api/perros",
      obtener: "GET /api/perros/:id",
      crear: "POST /api/perros",
      actualizar: "PUT /api/perros/:id",
      eliminar: "DELETE /api/perros/:id",
    },
  });
});

app.use("/api/perros", dogRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Servidor levantado en http://localhost:${PORT}`);
      console.log(`Documentacion Swagger: http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
