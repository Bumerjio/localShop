const express = require('express');
const router = express.Router();
const mongooseConnect = require('../../models/mongooseConnect');


router.get('/admin', (req, res, next) => {
  mongooseConnect.Item.find().exec()
    .then( tableitem => {
      res.render('./admin/allItems', {aItems: tableitem});
    })
    .catch(next)
});


module.exports = router;
