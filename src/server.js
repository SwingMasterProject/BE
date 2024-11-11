require("dotenv").config(); // dotenv をインポートして環境変数を読み込み

const app = require("./app"); // app.js をインポート
const PORT = process.env.PORT || 3000; // 環境変数から PORT を取得

// サーバーの起動
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
