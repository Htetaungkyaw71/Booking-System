import express from "express";
import cors from "cors";

import bookingRoutes from "./routes/bookings.js";
import userRoutes from "./routes/user.js";
import systemRoutes from "./routes/system.js";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import { fileURLToPath } from "node:url";
import path from "node:path";

// // Get the directory name of the current module
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const swaggerPath = path.join(__dirname, "swagger.yaml");
// const swaggerDocument = YAML.load(swaggerPath);

import { swaggerSpec } from "./config/swagger.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api", systemRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/users", userRoutes);

app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    method: req.method,
    path: req.originalUrl,
  });
});

app.use((err: any, req: any, res: any, next: any) => {
  console.error(err);
  res.status(500).json({
    error: "Internal server error",
  });
});

export default app;
