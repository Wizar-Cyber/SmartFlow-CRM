import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

import authRoutes from "./server/routes/auth";
import clientRoutes from "./server/routes/clients";
import projectRoutes from "./server/routes/projects";
import notificationRoutes from "./server/routes/notifications";
import securityRoutes from "./server/routes/security";
import teamRoutes from "./server/routes/team";
import contractRoutes from "./server/routes/contracts";
import paymentRoutes from "./server/routes/payments";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "SmartFlow API is running" });
  });

  app.use("/api/auth", authRoutes);
  app.use("/api/clients", clientRoutes);
  app.use("/api/projects", projectRoutes);
  app.use("/api/notifications", notificationRoutes);
  app.use("/api/security", securityRoutes);
  app.use("/api/team", teamRoutes);
  app.use("/api/contracts", contractRoutes);
  app.use("/api/payments", paymentRoutes);

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}

startServer();
