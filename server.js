const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/users');
const passportSetup = require('./config/passportSetup')
const cookieSession = require('cookie-session');
const passport = require('passport')

const port = process.env.PORT
const app = express();

app.use(cookieSession({ 
maxAge: 24 * 60 * 60 * 1000,
keys: [process.env.COOKIE_KEY]  
}))

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

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

const db = require('./models');
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`DB Connected and server running on ${port}.`);
    });
  })
  .catch((err) => {
    console.log('Cannot connect to the database!', err);
    process.exit();
  });