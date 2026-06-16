const express = require("express");
const router = express.Router();

const { askGeminiStream } = require("../services/gemini.service");

router.post("/stream", async (req, res) => {
  try {
    const { prompt } = req.body;

    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Transfer-Encoding", "chunked");

    for await (const chunk of askGeminiStream(prompt)) {
      res.write(chunk);
    }
    res.end();
  } catch (error) {
    console.error(error);

    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
});

module.exports = router;
