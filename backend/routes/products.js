const express = require("express");
const router = express.Router();

const db = require("../database/dbconfig");

/* GET products listing. */
router.get("/", async function(req, res, next) {
  const products = await db("products");
  res.header("Content-Type", "application/json");  
  res.send(JSON.stringify(products, null, 4));
});

module.exports = router;
