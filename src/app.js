require("dotenv").config(); // dotenv をインポートして環境変数を読み込み

const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const client = new MongoClient(process.env.MONGO_URI); // 環境変数から MongoDB URI を取得

// ミドルウェアの設定
app.use(express.json());

// MongoDB 接続の準備
(async () => {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
  }
})();

// ルート: Read
app.get("/", async (req, res) => {
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

// ルート: Create
app.post("/create", async (req, res) => {
  const newUser = req.body; // リクエスト本文から新しいデータを取得
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

// ルート: Update
app.put("/update/:title", async (req, res) => {
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

// ルート: Delete
app.delete("/delete/:title", async (req, res) => {
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

// アプリケーションインスタンスをエクスポート
module.exports = app;
