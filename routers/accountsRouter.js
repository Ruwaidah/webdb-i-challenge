const knex = require("../data/dbConfig.js");
const express = require("express");
const router = express.Router();
router.use(express.json());

router.get("/", (req, res) => {
  knex("accounts")
    .select("*")
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: "error getting accounts"
      });
    });
});

router.post("/", (req, res) => {
  const newAccount = req.body;
  knex("accounts")
    .insert(newAccount)
    .then(ids => {
      knex("accounts")
        .select("*")
        .where({ id: ids[0] })
        .first()
        .then(account => {
          res.status(200).json(account);
        });
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: "error getting accounts"
      });
    });
});

module.exports = router;
