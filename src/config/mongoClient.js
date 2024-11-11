const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGO_URI);

(async () => {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
  }
})();

module.exports = { client };
