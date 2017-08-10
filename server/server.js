const path = require('path');
const express = require('express');

let app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../public')));
app.use(logRequest);


app.use(notFound404);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server running on port ${ port }`);
});

/************
  Methods
*************/

function notFound404(req, res, next){
  res.status(404);
  res.type('txt').send('Not found');
}

function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
}

function log(line) {
  let timeStamp = new Date().toString();
  console.log(`${ timeStamp } ${ line }`);
}

function logRequest(req, res, next) {
  log(`${ req.method } ${ req.url }`);
  next();
}
