const express = require('express');
const router = express.Router();
const path = require('path');
const mongooseConnect = require('../models/mongooseConnect');


router.get('/items/:id', (req, res, next) => {

  let itemId = req.params.id;

  let filter = { _id: itemId };

  mongooseConnect.Item.find(filter).exec()
    .then((db) => {
      res.render('itemDetails', {
        itemsOptions: db
      });
    })
    .catch(next);
});
module.exports = router;
