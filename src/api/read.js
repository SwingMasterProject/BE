const express = require("express");
const router = express.Router();

// MongoDB クライアントのインスタンスを共有
const { client } = require("../config/mongoClient");

router.get("/", async (req, res) => {
  const db = client.db("test");
  const collection = db.collection("articles");
  try {
    const users = await collection.find({}).toArray();
    res.json(users);
  } catch (err) {
    console.error("Failed to read data:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

module.exports = router;
