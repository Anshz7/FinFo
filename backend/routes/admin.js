const express = require("express");
const router = express.Router();
const pool = require("../connection");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const { authenticateAdmin } = require("../middleware"); // We'll create this middleware

// Helper function to generate session token
function generateSessionToken() {
  return crypto.randomBytes(64).toString("hex");
}

// Admin Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required" });
  }

  try {
    // Find admin by username
    const [admin] = await pool.query(
      "SELECT * FROM admins WHERE username = ?",
      [username]
    );

    if (admin.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Verify password
    const isValid = await bcrypt.compare(password, admin[0].password_hash);
    if (!isValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate session token
    const token = generateSessionToken();
    const expiresAt = new Date(Date.now() + 12 * 60 * 60 * 1000); // 12 hours

    // Store session
    await pool.query(
      "INSERT INTO admin_sessions (admin_id, token, expires_at) VALUES (?, ?, ?)",
      [admin[0].id, token, expiresAt]
    );

    res.json({
      success: true,
      token,
      expires_at: expiresAt,
      admin: {
        id: admin[0].id,
        username: admin[0].username,
        email: admin[0].email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Admin Logout
router.post("/logout", authenticateAdmin, async (req, res) => {
  try {
    await pool.query(
      "DELETE FROM admin_sessions WHERE token = ?",
      [req.token] // Token from middleware
    );

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Add this to your admin routes
router.get("/me", authenticateAdmin, (req, res) => {
  res.json({
    admin: {
      id: req.admin.id,
      username: req.admin.username,
      email: req.admin.email,
    },
  });
});

module.exports = router;
