const express = require("express");
const bodyParser = require("express").json;
const authRoutes = require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const {
  initializeDatabase,
  loadDataToDatabase,
  loadDataToMemory,
} = require("./models/database");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser());
app.use("/api/auth", authRoutes);
app.use("/api/transaction", transactionRoutes);

async function startServer() {
  try {
    await initializeDatabase();
    await loadDataToDatabase();
    await loadDataToMemory();
    app.listen(3000, () => console.log("Server running on port 3000"));
  } catch (err) {
    console.error("Error starting server:", err);
  }
}
startServer();
