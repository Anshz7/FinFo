const express = require("express");
const router = express.Router();
const pool = require("../connection");
const axios = require("axios");

// Azure Translator configuration
async function azureTranslate(texts, targetLang) {
  try {
    const endpoint = process.env.AZURE_TRANSLATOR_ENDPOINT;
    const location = process.env.AZURE_TRANSLATOR_REGION;
    const subscriptionKey = process.env.AZURE_TRANSLATOR_KEY;

    if (!endpoint || !subscriptionKey || !location) {
      throw new Error("Azure Translator configuration is missing");
    }

    const response = await axios.post(
      `${endpoint}/translate?api-version=3.0&to=${targetLang}`,
      texts.map((text) => ({ Text: text })),
      {
        headers: {
          "Ocp-Apim-Subscription-Key": subscriptionKey,
          "Ocp-Apim-Subscription-Region": location,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.map((t) => t.translations[0].text);
  } catch (error) {
    console.error("Azure Translate Error:", error.response?.data || error.message);
    throw new Error("Translation failed: " + (error.response?.data?.error?.message || error.message));
  }
}
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
 *   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 *   lang VARCHAR(255)
 * );
 */

// CREATE: Add a new record with translations
router.post("/", async (req, res) => {
  const { title, slug, content, category, source_link, banner_link } = req.body;
  const targetLanguages = [
    "hi", "ta", "mr", "te", "kn", 
    "gu", "pa", "bn", "ml", "ur"
  ];

  try {
    // 1. Insert original English record
    const [originalResult] = await pool.query(
      "INSERT INTO finfotable (title, slug, content, category, source_link, banner_link, lang) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [title, slug, content, category, source_link, banner_link, "en"]
    );

    // 2. Process translations
    const insertResults = await Promise.all(
      targetLanguages.map(async (lang, index) => {
        try {
          // Translate both title and content in a single request
          const translatedTexts = await azureTranslate([title, content], lang);
          const [translatedTitle, translatedContent] = translatedTexts;

          const uniqueSlug = `${slug}-${index}`;
          const [result] = await pool.query(
            "INSERT INTO finfotable (title, slug, content, category, source_link, banner_link, lang) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [
              translatedTitle,
              uniqueSlug,
              translatedContent,
              category,
              source_link,
              banner_link,
              lang,
            ]
          );

          return { ...result, slug: uniqueSlug, lang };
        } catch (translationError) {
          console.error(`Translation failed for ${lang}:`, translationError);
          return null; // Handle individual translation failures
        }
      })
    );

    // Filter out failed translations
    const successfulInserts = insertResults.filter(result => result !== null);

    res.status(201).json([
      {
        id: originalResult.insertId,
        title,
        slug,
        content,
        category,
        source_link,
        banner_link,
        lang: "en",
      },
      ...successfulInserts,
    ]);
  } catch (error) {
    res.status(500).json({ 
      error: error.message,
      details: error.response?.data || {}
    });
  }
});

// READ: Get all records with pagination and optional lang filter
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const lang = req.query.lang || null;

    if (page < 1 || pageSize < 1) {
      return res
        .status(400)
        .json({ error: "page and pageSize must be positive integers" });
    }

    // Build dynamic WHERE clause
    let whereClause = "";
    const queryParams = [];

    if (lang) {
      whereClause = "WHERE lang = ?";
      queryParams.push(lang);
    }

    // Get total count
    const [countResult] = await pool.query(
      `SELECT COUNT(*) AS total FROM finfotable ${whereClause}`,
      queryParams
    );
    const totalItems = countResult[0].total;
    const totalPages = Math.ceil(totalItems / pageSize);

    // Calculate offset
    const offset = (page - 1) * pageSize;

    // Fetch paginated and filtered data
    queryParams.push(pageSize, offset);
    const [rows] = await pool.query(
      `SELECT * FROM finfotable ${whereClause} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
      queryParams
    );

    res.status(200).json({
      data: rows,
      pagination: {
        page,
        pageSize,
        totalItems,
        totalPages,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ: Get all records by category with pagination and optional lang filter
router.get("/category/:category", async (req, res) => {
  const { category } = req.params;
  const lang = req.query.lang || null; // Extract lang from query params

  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    if (page < 1 || pageSize < 1) {
      return res.status(400).json({
        error: "page and pageSize must be positive integers",
      });
    }

    // Build dynamic WHERE clause
    let whereClause = "WHERE category = ?";
    const queryParams = [category];

    if (lang) {
      whereClause += " AND lang = ?";
      queryParams.push(lang);
    }

    // Get total count with filters
    const [countResult] = await pool.query(
      `SELECT COUNT(*) AS total FROM finfotable ${whereClause}`,
      queryParams
    );
    const totalItems = countResult[0].total;
    const totalPages = Math.ceil(totalItems / pageSize);

    if (totalItems === 0) {
      return res.status(404).json({
        message: "No records found matching the criteria",
      });
    }

    // Calculate offset
    const offset = (page - 1) * pageSize;

    // Fetch paginated data with filters
    const dataQueryParams = [...queryParams, pageSize, offset];
    const [rows] = await pool.query(
      `SELECT * FROM finfotable ${whereClause} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
      dataQueryParams
    );

    res.status(200).json({
      data: rows,
      pagination: {
        page,
        pageSize,
        totalItems,
        totalPages,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ: Get a single record by slug
router.get("/:slug", async (req, res) => {
  const { slug } = req.params;
  try {
    const [rows] = await pool.query("SELECT * FROM finfotable WHERE slug = ?", [
      slug,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Record not found" });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE: Update a record by ID
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const fields = [
    "title",
    "slug",
    "content",
    "category",
    "source_link",
    "banner_link",
    "lang",
  ];
  const updates = [];
  const values = [];

  for (const field of fields) {
    if (req.body[field] !== undefined) {
      updates.push(`${field} = ?`);
      values.push(req.body[field]);
    }
  }

  if (updates.length === 0) {
    return res.status(400).json({ message: "No fields provided to update" });
  }

  values.push(id);

  const sql = `UPDATE finfotable SET ${updates.join(", ")} WHERE id = ?`;

  try {
    const [result] = await pool.query(sql, values);
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Record not found or no changes made" });
    }
    res.status(200).json({ id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE: Delete a record by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query("DELETE FROM finfotable WHERE id = ?", [
      id,
    ]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Record not found" });
    }
    res.status(200).json({ message: "Record deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
