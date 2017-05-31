const express = require('express');
const mongooseConnect = require('../../models/mongooseConnect');
// const bodyParser = require('body-parser');
const router = express.Router();
const ObjectID = require('mongodb').ObjectID;




router.get('/admin/edit/:id', (req, res, next) => {
  let oneItem = req.params.id;
  let filterOne = { _id: new ObjectID(oneItem)};
  mongooseConnect.Item.find(filterOne).exec()
    .then( findId => {
      res.render('./admin/edit', {findId: findId});
    })
    .catch(next)
});

router.post('/admin/edit/:id', (req, res, next) => {
  let updateItem = req.params.id;
  let Updatefilter = {_id: new ObjectID(updateItem)};
  const newData = {
    description: req.body.description,
    price: req.body.price,
    article: req.body.article,
    url_images: [req.body.url_images],
    name_dress: req.body.name_dress
  }

  mongooseConnect.Item.update(Updatefilter, newData).exec()
    .then( findId => {
      res.redirect('/admin');
      // res.render('./admin/allItems', {findId: findId})
    })
    .catch( err => {
      if(err) {
        res.locals.errors = err;
        res.redirect('/admin/edit/' + updateItem)
        return;
        next(err)
      }
    })
});


module.exports = router;
