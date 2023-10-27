const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const authRoutes = require('./routes/users');

const port = process.env.PORT
const app = express();

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'))
  .use('/auth', authRoutes);



  
// File Not Found Route - must be last route in list
app.use((req, res, next) => {
next({status: 404, message: 'Sorry, we appear to have lost that page.'})
})


// Handling Errors
app.use((err, req, res, next) => {
  // console.log(err);
  err.statusCode = err.statusCode || 500;
  err.message = 'Sorry, something went wrong' || "Internal Server Error";
  res.status(err.statusCode).json({
    message: err.message,
  });
});

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});