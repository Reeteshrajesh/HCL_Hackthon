/*const express = require("express");
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
    app.listen(3001, () => console.log("Server running on port 3001"));
  } catch (err) {
    console.error("Error starting server:", err);
  }
}
startServer();
*/

const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const {
  initializeDatabase,
  loadDataToDatabase,
  loadDataToMemory,
} = require("./models/database");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/transaction", transactionRoutes);

async function startServer() {
  console.log("🚀 Starting server...");
  try {
    console.log("🔹 Initializing database...");
    await initializeDatabase();
    console.log("✅ Database initialized");
  } catch (err) {
    console.error("❌ Error initializing database:", err);
  }

  try {
    console.log("🔹 Loading data to database...");
    await loadDataToDatabase();
    console.log("✅ Data loaded to database");
  } catch (err) {
    console.error("❌ Error loading data to database:", err);
  }

  try {
    console.log("🔹 Loading data to memory...");
    await loadDataToMemory();
    console.log("✅ Data loaded to memory");
  } catch (err) {
    console.error("❌ Error loading data to memory:", err);
  }

  console.log("🚀 Starting Express server...");
  app.listen(3001, () => console.log("✅ Server running on port 3001"));
}

startServer();
