const express = require("express");
const router = express.Router();

// MongoDB クライアントのインスタンスを共有
const { client } = require("../config/mongoClient");

router.put("/update/:title", async (req, res) => {
  const title = req.params.title;
  const updated = req.body;
  const db = client.db("test");
  const collection = db.collection("articles");
  try {
    const result = await collection.updateOne(
      { title: title },
      { $set: updated }
    );
    res.json(result);
  } catch (err) {
    console.error("Error updating data:", err);
    res.status(500).json({ error: "Failed to update data" });
  }
});

module.exports = router;
