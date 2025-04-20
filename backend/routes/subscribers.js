// table structure
// CREATE TABLE subscribers (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     email VARCHAR(255) NOT NULL UNIQUE,
//     subscribed BOOLEAN DEFAULT TRUE,
//     subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//   );

// CREATE TABLE pending_subscribers (
//   id INT AUTO_INCREMENT PRIMARY KEY,
//   email VARCHAR(255) NOT NULL UNIQUE,
//   token VARCHAR(255) NOT NULL UNIQUE,
//   expires_at DATETIME NOT NULL,
//   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );

const express = require("express");
const router = express.Router();
const pool = require("../connection");
const crypto = require("crypto");
const transporter = require("../email"); // Create a shared email transporter

// Helper function to send confirmation email
async function sendConfirmationEmail(email, token) {
  const confirmationLink = `${process.env.FRONTEND_URL}/confirm-subscription/${token}`;

  const mailOptions = {
    from: `"Your Service Name" <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: "Confirm Your Subscription",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Please confirm your subscription</h2>
        <p>Click the link below to confirm your email address:</p>
        <a href="${confirmationLink}" 
           style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">
          Confirm Subscription
        </a>
        <p>This link expires in 24 hours.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}

// Modified subscribe endpoint
router.post("/", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email required" });

  let pendingInserted = false;

  try {
    // Check existing subscribers
    const [existing] = await pool.query(
      "SELECT * FROM subscribers WHERE email = ? AND subscribed = TRUE",
      [email]
    );

    if (existing.length > 0) {
      return res.status(200).json({ message: "Already subscribed" });
    }

    // Check pending subscriptions
    const [pending] = await pool.query(
      "SELECT * FROM pending_subscribers WHERE email = ?",
      [email]
    );

    if (pending.length > 0) {
      await sendConfirmationEmail(email, pending[0].token);
      return res.status(200).json({ message: "Confirmation email resent" });
    }

    // Generate token and expiration
    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    await pool.query(
      "INSERT INTO pending_subscribers (email, token, expires_at) VALUES (?, ?, ?)",
      [email, token, expiresAt]
    );

    pendingInserted = true;
    await sendConfirmationEmail(email, token);

    res.status(200).json({ message: "Confirmation email sent" });
  } catch (err) {
    console.error(err);

    // Clean up pending entry if email failed
    if (pendingInserted) {
      await pool.query("DELETE FROM pending_subscribers WHERE email = ?", [
        email,
      ]);
    }

    res.status(500).json({ error: "Internal server error" });
  }
});

// Modify the confirmation endpoint to return JSON responses
router.get("/confirm/:token", async (req, res) => {
  const { token } = req.params;

  try {
    const [pending] = await pool.query(
      "SELECT * FROM pending_subscribers WHERE token = ?",
      [token]
    );

    if (pending.length === 0) {
      return res.status(400).json({
        success: false,
        reason: "invalid_token",
      });
    }

    const pendingSub = pending[0];

    // Check expiration
    if (new Date(pendingSub.expires_at) < new Date()) {
      await pool.query("DELETE FROM pending_subscribers WHERE token = ?", [
        token,
      ]);
      return res.status(400).json({
        success: false,
        reason: "expired",
      });
    }

    // Add to subscribers
    await pool.query(
      "INSERT INTO subscribers (email, subscribed) VALUES (?, TRUE) " +
        "ON DUPLICATE KEY UPDATE subscribed = TRUE",
      [pendingSub.email]
    );

    // Cleanup pending
    await pool.query("DELETE FROM pending_subscribers WHERE token = ?", [
      token,
    ]);

    res.json({
      success: true,
      email: pendingSub.email,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      reason: "server_error",
    });
  }
});

// Updated unsubscribe endpoint
router.delete("/:email", async (req, res) => {
  const { email } = req.params;

  try {
    const [result] = await pool.query(
      "UPDATE subscribers SET subscribed = FALSE WHERE email = ?",
      [email]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Email not found",
        reason: "not_found",
      });
    }

    // Modified success response
    res.status(200).json({
      success: true,
      message: "Unsubscribed successfully",
      email: email,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Internal server error",
      reason: "server_error",
    });
  }
});

module.exports = router;
