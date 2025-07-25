const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const contactRoutes = require("./routes/contactRoutes");

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Logging middleware (logs method, URL, and time)
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

// ✅ Serve Let's Encrypt challenge files
app.use(
  "/.well-known/acme-challenge",
  express.static("/var/www/beks.tech/.well-known/acme-challenge")
);

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, "public", "dist")));

// API routes
app.use("/api/contact", contactRoutes);

// Serve index.html at '/'
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "dist", "index.html"));
});

// Serve index.html at '/'
app.get("/chidiebere", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "dist", "index.html"));
});

// Start server
const PORT = process.env.PORT || 3500;
app.listen(3500, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
