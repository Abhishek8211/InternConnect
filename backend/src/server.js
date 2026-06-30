require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

// ─── Start Server ─────────────────────────────────────────────────
const startServer = async () => {
  await connectDB();

  const server = app.listen(PORT, () => {
    console.log(`\n🚀 InternConnect API running in ${process.env.NODE_ENV || "development"} mode`);
    console.log(`📡 Server: http://localhost:${PORT}`);
    console.log(`🔗 API Base: http://localhost:${PORT}/api/v1\n`);
  });

  // ─── Graceful Shutdown ────────────────────────────────────────
  const gracefulShutdown = (signal) => {
    console.log(`\n⚠️  ${signal} received. Shutting down gracefully...`);
    server.close(() => {
      console.log("✅ HTTP server closed.");
      process.exit(0);
    });
  };

  process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
  process.on("SIGINT", () => gracefulShutdown("SIGINT"));

  // ─── Unhandled Promise Rejections ─────────────────────────────
  process.on("unhandledRejection", (err) => {
    console.error("❌ Unhandled Rejection:", err.name, err.message);
    server.close(() => process.exit(1));
  });
};

startServer();
