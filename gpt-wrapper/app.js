const express = require("express");
const models = require("langchain/chat_models/openai");

const chatModel = models.ChatOpenAI({ modelName: "gpt-4", temperature: 0.1 });

const app = express();

app.get("/", (_, res) => {
  res.send("Hello World!");
});

app.post("/api/satisfaction", (req, res) => {
  const requestData = req.body;
  console.log("Received POST data:", requestData);
  res.json({ message: "Client is satisfied" });
});

app.put("api/grid", (req, res) => {
  const requestData = req.body;
  console.log("Received PUT data:", requestData);
  res.json({ message: "Grid is created" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
