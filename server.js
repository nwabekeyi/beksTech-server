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

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, "public", "dist")));

// API routes
app.use("/api/contact", contactRoutes);

// Serve index.html at '/'
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", 'dist', "index.html"));
});

// Start server
const PORT = process.env.PORT || 3500;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
