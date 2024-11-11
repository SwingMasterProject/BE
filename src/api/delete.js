const express = require("express");
const router = express.Router();

// MongoDB クライアントのインスタンスを共有
const { client } = require("../config/mongoClient");

router.delete("/delete/:title", async (req, res) => {
  const title = req.params.title;
  const db = client.db("test");
  const collection = db.collection("articles");
  try {
    const result = await collection.deleteOne({ title: title });
    res.json(result);
  } catch (err) {
    console.error("Failed to delete data:", err);
    res.status(500).json({ error: "Failed to delete data" });
  }
});

module.exports = router;
