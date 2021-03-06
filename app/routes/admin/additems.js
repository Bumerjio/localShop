const express = require('express');
const router = express.Router();
const bodyParser= require('body-parser');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const mongooseConnect = require('../../models/mongooseConnect');

//upload images property
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'app/public/images/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname) //Appending extension path.extname(file.originalname)
  }
})

const upload = multer({ storage: storage });

//routes

router.get('/admin/additems', (req, res) => {
  res.render('./admin/additems');
});


router.post('/admin/additems', upload.array('url_images', 4), (req, res, next) => {
//фото заталкивает в массив для mongodb
  let arraImages = () => {
      let arrImg = [];
      for (let i = 0; i < req.files.length; i++) {
        arrImg.push(req.files[i].filename)
      }
      return arrImg

  };
  //Генерирую уникальный артикул, не уверен на счет уникальности
  let article = () => {
    let uniqueNumber = new Date().getTime();
    let lastNumbFrom = uniqueNumber.toString().slice(-4);

    let anotherUniq = Math.floor(Math.random() * 100).toString()

    let text = "";
      const possible = "ABСWXYZ";

      for( let i = 0; i < 2; i++ )
          text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text + lastNumbFrom + anotherUniq;
  };

  let adduser = new mongooseConnect.Item({
    description: req.body.description,
    price: req.body.price,
    article: article(),
    // req.body.article
    url_images: arraImages(),
    name_dress: req.body.name_dress
  });

  adduser.save()
    // .then((adduser) => {
    //   fs.mkdir(path.join(__dirname, '../../public/images/' + adduser._id), err => {
    //     if (err) {
    //       res.sendStatus(404);
    //       console.log(err);
    //     }
    //     else return;
    //   })
    //   //
    //   for (let i = 0; i < adduser.url_images.length; i++) {
    //     console.log(adduser.url_images[i]);
    //     fs.move(path.join(__dirname, '../../public/images/' + adduser.url_images[i]),
    //       path.join(__dirname, '../../public/images/' + adduser._id + adduser.url_images[i]))
    //   }
    // })
    .then(() => res.redirect('/admin/additems'))
    .catch(next)
});


module.exports = router;
