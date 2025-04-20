require("dotenv").config();
const express = require("express");
const cors = require("cors"); // Import CORS middleware
const finfotableRoutes = require("./routes/finfotable");

const app = express();

// Enable CORS for all origins (for development)
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Mount the finfotable routes under /finfotable
app.use("/finfotable", finfotableRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});