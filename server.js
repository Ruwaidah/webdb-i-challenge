const express = require("express");

const db = require("./data/dbConfig.js");
const accountsRouter = require("./routers/accountsRouter");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).send(`<h1>Welcome</h1>`);
});

server.use("/accounts", accountsRouter);

module.exports = server;
