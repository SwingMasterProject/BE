const express = require("express");
const router = express.Router();

// MongoDB クライアントのインスタンスを共有
const { client } = require("../config/mongoClient");

router.post("/create", async (req, res) => {
  const newUser = req.body;
  const db = client.db("test");
  const collection = db.collection("articles");
  try {
    const result = await collection.insertOne(newUser);
    res.json({
      acknowledged: result.acknowledged,
      insertedId: result.insertedId,
    });
  } catch (err) {
    console.error("Error creating data:", err);
    res.status(500).json({ error: "Failed to create data" });
  }
});

module.exports = router;
