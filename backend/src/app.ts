import express from "express";
import cors from "cors";

import bookingRoutes from "./routes/bookings.js";
import userRoutes from "./routes/user.js";
import systemRoutes from "./routes/system.js";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

const swaggerDocument = YAML.load("./swagger.yaml");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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
