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
// app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Serve Swagger spec as JSON
app.get("/docs/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

// Custom HTML with CDN links
app.use("/docs", swaggerUi.serve, (req: any, res: any, next: any) => {
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Booking System API Docs</title>
  <link rel="stylesheet" type="text/css" href="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui.css" />
  <style>
    .topbar { display: none; }
    html { box-sizing: border-box; overflow: -moz-scrollbars-vertical; overflow-y: scroll; }
    *, *:before, *:after { box-sizing: inherit; }
    body { margin: 0; background: #fafafa; }
  </style>
</head>
<body>
  <div id="swagger-ui"></div>
  <script src="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui-bundle.js"></script>
  <script src="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui-standalone-preset.js"></script>
  <script>
    window.onload = function() {
      const ui = SwaggerUIBundle({
        url: "/docs/swagger.json",
        dom_id: '#swagger-ui',
        deepLinking: true,
        presets: [
          SwaggerUIBundle.presets.apis,
          SwaggerUIStandalonePreset
        ],
        plugins: [
          SwaggerUIBundle.plugins.DownloadUrl
        ],
        layout: "StandaloneLayout"
      });
      window.ui = ui;
    };
  </script>
</body>
</html>
  `;
  res.send(html);
});

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
