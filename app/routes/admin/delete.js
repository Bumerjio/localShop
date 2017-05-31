const express = require('express');
const mongooseConnect = require('../../models/mongooseConnect');
const router = express.Router();
const fs = require('fs');
const path = require('path');
    // __parentDir = path.dirname(module.parent.filename);


router.get('/admin/delete/:id', (req, res, next) => {
  let deleteOne = req.params.id;
  let filterOne = {_id: deleteOne};
  mongooseConnect.Item.findById(deleteOne).exec()
    .then((db) => {
      //вытаскиваем с массива каждый элемент отдельно
      db.url_images.forEach((item, index) => {
        fs.unlink((path.join(__dirname, '../../public/images/') + db.url_images[index]), err => {
          if (!err) console.log('Images deleted!')
          else console.log('Images not found or can not delete');
        });
      });
      // console.log(path.join(__dirname, '../../public/images/') + db.url_images)
    })
    .then((db) => {
      mongooseConnect.Item.findByIdAndRemove(deleteOne).exec()
    })
    .then(() => {
      res.redirect('/admin');
    })
    .catch(next)
});


module.exports = router;


// mongooseConnect.Item.findByIdAndRemove(deleteOne).exec()
//   .then(() => {
//     res.redirect('/admin');
//   })
//   .catch(next)
