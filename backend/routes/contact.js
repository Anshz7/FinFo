const express = require("express");
const router = express.Router();
const pool = require("../connection");

// Create a new contact message
router.post("/", async (req, res) => {
  const { name, email, subject, message, category } = req.body;

  console.log("Received contact form data:", req.body);

  if (!name || !email || !message) {
    console.warn("Validation failed - Missing required fields");
    return res.status(400).json({ error: "Name, email, and message are required." });
  }

  try {
    const [result] = await pool.query(
      "INSERT INTO contact_messages (name, email, subject, message, category) VALUES (?, ?, ?, ?, ?)",
      [name, email, subject || null, message, category || 'Other']
    );
    
    console.log("Database insert successful, ID:", result.insertId);
    res.status(201).json({ success: true, id: result.insertId });
    
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ 
      error: "Internal server error",
      details: err.message,
      code: err.code 
    });
  }
});

// Updated GET /contact endpoint
router.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const offset = (page - 1) * pageSize;

  try {
    // Get total count
    const [[countResult]] = await pool.query("SELECT COUNT(*) AS total FROM contact_messages");
    const total = countResult.total;

    // Get paginated results
    const [messages] = await pool.query(
      "SELECT * FROM contact_messages ORDER BY created_at DESC LIMIT ? OFFSET ?",
      [pageSize, offset]
    );

    res.json({
      messages,
      totalPages: Math.ceil(total / pageSize),
      currentPage: page,
      totalMessages: total
    });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get a single message by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [message] = await pool.query("SELECT * FROM contact_messages WHERE id = ?", [id]);
    if (message.length === 0) {
      return res.status(404).json({ error: "Message not found" });
    }
    res.json(message[0]);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update message status
router.patch("/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses = ["pending", "read", "resolved"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: "Invalid status value" });
  }

  try {
    const [result] = await pool.query(
      "UPDATE contact_messages SET status = ? WHERE id = ?",
      [status, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Message not found" });
    }
    res.json({ success: true, message: "Status updated" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete a message
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query("DELETE FROM contact_messages WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Message not found" });
    }
    res.json({ success: true, message: "Message deleted" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
