require("dotenv").config(); // dotenv を読み込み

const express = require("express");
const app = express();

// ミドルウェアの設定
app.use(express.json());

// ルートの統合
app.use(require("./api/read"));
app.use(require("./api/create"));
app.use(require("./api/update"));
app.use(require("./api/delete"));

// エクスポート
module.exports = app;
