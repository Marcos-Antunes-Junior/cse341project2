const express = require('express');
const cors = require('cors')
const app = express();
const bodyParser = require('body-parser');
const authRoutes = require('./routes/users');
const passportSetup = require('./config/passportSetup')
const passport = require('passport');
const cookieParser = require('cookie-parser');
const utilities = require('./utilities/validation');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const db = require('./models');

const port = process.env.PORT


app.use(session({
createTableIfMissing: true,
db,
secret: process.env.SESSION_SECRET,
resave: true,
saveUninitialized: true,
name: 'sessionId', 
store: MongoStore.create({
  mongoUrl: process.env.DATABASE_URI,
}),
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// Use CORS middleware here
app.use(cors({
  origin: "http://localhost:5173",
  methods: "GET, POST, PUT, DELETE",
  credentials: true,
}));
app.use(cookieParser())


  
// Routes
app.use('/', require('./routes'))
app.use('/auth', authRoutes);



  
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