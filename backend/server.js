require("dotenv").config();
const express = require("express");
const cors = require("cors"); // Import CORS middleware
const finfotableRoutes = require("./routes/finfotable");
const subscribersRoutes = require("./routes/subscribers");
const adminRoutes = require("./routes/admin");
const contactRoutes = require("./routes/contact");

const app = express();

// Enable CORS for all origins (for development)
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Mount the contact routes under /contact
app.use("/contact", contactRoutes);

// Mount the admin routes under /admin
app.use("/admin", adminRoutes);

// Mount the finfotable routes under /finfotable
app.use("/finfotable", finfotableRoutes);

// Mount the subscribers routes under /subscribers
app.use("/subscribers", subscribersRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});