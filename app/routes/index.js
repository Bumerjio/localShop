const express = require('express');
const router = express.Router();
const mongooseConnect = require('../models/mongooseConnect');
const mongoose = require('mongoose');



router.get('/', (req, res, next) => {
  mongooseConnect.Item.find().exec()
    .then((items) => {
        res.render('index', {item: items})
      })
    .catch(next)
    // console.log(res.)
});

module.exports = router;
