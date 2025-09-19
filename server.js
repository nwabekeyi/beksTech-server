const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const mongoose = require("mongoose");

const contactRoutes = require("./routes/contactRoutes");
const projectRoutes = require("./routes/projectRoutes");
const adminRoutes = require("./routes/adminRoutes"); 

dotenv.config();
const app = express();

// ✅ CONNECT TO MONGO
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err));

app.use(cors());
app.use(express.json());

// ✅ Logger
app.use((req, res, next) => {
  const now = new Date().toISOString();
  console.log(`[${now}] ${req.method} ${req.originalUrl}`);
  next();
});

// app.use(express.json);
// const users = [
//     {
//         id: 1,
//         username: 'chidi',
//         age: 30
//     }
// ];



// app.get('/api/v1/users', (req, res) =>{
//     console.log('testing')

// console.log('called')
//     res.send({
//         message: 'success',
//         users
//     })

// });

// ✅ SSL Certificate Challenge Path
app.use(
  "/.well-known/acme-challenge",
  express.static("/var/www/beks.tech/.well-known/acme-challenge")
);

// ✅ Serve Static Files
app.use(express.static(path.join(__dirname, "public", "dist")));

// ✅ API Routes
app.use("/api/contact", contactRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/admin", adminRoutes); 

// ✅ Fallback Route for SPA
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "dist", "index.html"));
});

app.get("/chidiebere", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "dist", "index.html"));
});

// ✅ Server Listen
const PORT = process.env.PORT || 3500;
app.listen(PORT, "0.0.0.0", () => {
  console.log(` Server running on port ${PORT}`);
});
