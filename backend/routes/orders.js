const express = require("express");
const router = express.Router();

const db = require("../database/dbconfig");

/* GET products listing. */
router.post("/", async function(req, res) {
  function changeObject(data) {
    return {
      ...data,
      products: JSON.stringify(data.products)
    };
  }

  const data = changeObject(req.body);

  try {
    const order = await db("orders")
      .insert(data)
      .then(ids =>({order_id:ids[0]}));

    res.header("Content-Type", "application/json");
    res.status(201).json({...order, msg:'New Order Created Successfully.'});
} catch (error) {
    console.log(error);
    res.status(500).json({msg:'Internal Error! Order not Created'});
  }
});

module.exports = router;
