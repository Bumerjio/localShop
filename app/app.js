const express = require('express');
const reload = require('reload');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const multer = require('multer');


// const dataFile = require('./data/data.json');


app.set('port', process.env.PORT || 3000);

// app.set('appData', dataFile);
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
//basic static route
app.use(express.static(path.join(__dirname, 'public')));
//route for /items/:id/
app.use('/items', express.static(path.join(__dirname, 'public')));
//route for admin
app.use('/admin', express.static(path.join(__dirname, 'public')));
//route for edit
app.use('/admin/edit', express.static(path.join(__dirname, 'public')));
//route for delete
app.use('/admin/delete/:id', express.static(path.join(__dirname, 'public')));


app.use(bodyParser.urlencoded({ extended: true }));


app.use(require('./routes/index'));
app.use(require('./routes/admin/adminPanel'));
app.use(require('./routes/admin/additems'));
app.use(require('./routes/admin/edit'));
app.use(require('./routes/admin/delete'));
app.use(require('./routes/currentItem'));

//обработчик ошибок!
app.use((req, res, next) => {
    res.status(404);
    res.send('Page not found!');
    return;
});

app.use(function(err, req, res, next){
    res.status(err.status || 500);
    // log.error('Internal error(%d): %s',res.statusCode,err.message);
    res.send({ error: err.message });
    return;
});

// app.use(require('./routes/index/:id'));//зделать через :id etc

const server = app.listen(app.get('port'), () => {
  console.log('Listening on port ' + app.get('port'));
});


// reload(server, app);
