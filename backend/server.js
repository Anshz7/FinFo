require("dotenv").config();
const express = require("express");
const finfotableRoutes = require("./routes/finfotable");

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Mount the finfotable routes under /finfotable
app.use("/finfotable", finfotableRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
