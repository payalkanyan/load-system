require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

// Import Routes
const authRoutes = require("./routes/authRoutes");
const loadRoutes = require("./routes/loadRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const adminRoutes = require("./routes/adminRoutes");

// Initialize Express
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);


// Connect to MongoDB
connectDB();

// Setup Routes
app.use("/api/auth", authRoutes);
app.use("/api/loads", loadRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/transaction", transactionRoutes);
app.use('/api/truckers', truckerRoutes);

// Create HTTP Server for WebSockets
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("📡 A user connected");

  socket.on("updateLocation", ({ loadId, location }) => {
    io.emit(`load:${loadId}`, location);
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected");
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
