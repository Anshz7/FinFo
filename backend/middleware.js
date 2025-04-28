const pool = require("./connection");

async function authenticateAdmin(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: "Authentication required" });
  }

  try {
    // Get session with admin data
    const [session] = await pool.query(
      `SELECT admin_sessions.*, admins.username, admins.email 
       FROM admin_sessions 
       JOIN admins ON admin_sessions.admin_id = admins.id
       WHERE token = ?`,
      [token]
    );

    if (session.length === 0) {
      return res.status(401).json({ error: "Invalid session" });
    }

    // Check expiration
    if (new Date(session[0].expires_at) < new Date()) {
      await pool.query("DELETE FROM admin_sessions WHERE token = ?", [token]);
      return res.status(401).json({ error: "Session expired" });
    }

    // Attach admin data to request
    req.admin = {
      id: session[0].admin_id,
      username: session[0].username,
      email: session[0].email
    };
    req.token = token;

    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { authenticateAdmin };