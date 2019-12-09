const knex = require("../data/dbConfig.js");
const express = require("express");
const router = express.Router();
router.use(express.json());

// Get all accounts
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

// Get account by id
router.get("/:id", (req, res) => {
  knex("accounts")
    .select("*")
    .where({ id: req.params.id })
    .first()
    .then(account => {
      res.status(200).json(account);
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: "error getting accounts"
      });
    });
});

// Adding new account

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

// Update account
router.put("/:id", (req, res) => {
  knex("accounts")
    .where({ id: req.params.id })
    .update(req.body)
    .then(ids => {
      console.log(ids);
      knex("accounts")
        .select("*")
        .where({ id: ids })
        .first()
        .then(ccount => {
          res.status(200).json(ccount);
        })
        .catch(error => {
          res.status(500).json({
            errorMessage: "error getting account"
          });
        });
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: "error update account"
      });
    });
});

// Delete account
router.delete("/:id", (req, res) => {
  knex("accounts")
    .where({ id: req.params.id })
    .del()
    .then(removed => {
      res.status(200).json({ message: "successfully deleted" });
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: "error deleting account"
      });
    });
});

module.exports = router;
