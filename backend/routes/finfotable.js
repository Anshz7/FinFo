const express = require('express');
const router = express.Router();
const pool = require('../connection');

/**
 * Table structure:
 * CREATE TABLE finfotable (
 *   id INT AUTO_INCREMENT PRIMARY KEY,
 *   title VARCHAR(255) NOT NULL,
 *   slug VARCHAR(255) UNIQUE NOT NULL,
 *   content TEXT NOT NULL,
 *   category VARCHAR(255) NOT NULL,
 *   source_link VARCHAR(500),
 *   banner_link VARCHAR(500),
 *   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 * );
 */

// CREATE: Add a new record
router.post('/', async (req, res) => {
  const { title, slug, content, category, source_link, banner_link } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO finfotable (title, slug, content, category, source_link, banner_link) VALUES (?, ?, ?, ?, ?, ?)',
      [title, slug, content, category, source_link, banner_link]
    );
    res.status(201).json({ id: result.insertId, title, slug, content, category, source_link, banner_link });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ: Get all records
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM finfotable');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ: Get a single record by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM finfotable WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE: Update a record by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, slug, content, category, source_link, banner_link } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE finfotable SET title = ?, slug = ?, content = ?, category = ?, source_link = ?, banner_link = ? WHERE id = ?',
      [title, slug, content, category, source_link, banner_link, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Record not found or no changes made' });
    }
    res.status(200).json({ id, title, slug, content, category, source_link, banner_link });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE: Delete a record by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM finfotable WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.status(200).json({ message: 'Record deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
