const express = require('express');
const router = express.Router();
const mongooseConnect = require('../../models/mongooseConnect');


router.get('/admin', (req, res, next) => {

  let search = req.query.search;
  let query = {};

  if(search) {
    query.name_dress = {
      $regex: search
    }
  };

  mongooseConnect.Item.find(query).exec()
    .then( tableitem => {
      res.render('./admin/allItems', {
        aItems: tableitem,
        search: search
      });
    })
    .catch(next)
});


module.exports = router;
