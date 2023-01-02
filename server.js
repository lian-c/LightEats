// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const cookieSession = require('cookie-session');
const crypto = require('crypto');

const PORT = process.env.PORT || 8080;
const app = express();
const bcrypt = require('bcryptjs');

// app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));

// added cookie session.
app.use(cookieSession({
  name: 'session',
  keys: ['userId'],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))


// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userApiRoutes = require('./routes/users-api');
const widgetApiRoutes = require('./routes/widgets-api');
const usersRoutes = require('./routes/users');
const menuRoutes = require('./routes/menu');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`




// fake login starts here ///
const { users } = require('./db/fakeUserData');
app.get('/login', (req, res) => {
  res.render('user/login');
});

app.post("/login", (req, res) => {
  console.log(req.body)
  const user = users.filter(user => user.email === req.body.email);

  console.log(user)
  if (!user) {
    return res.status(401).json({ error: "Login error" });
  }
  req.session.userId = user.id;
  res.status(200).json(user);
});

app.post("/register", (req, res) => {
  console.log(req.body);
  res.status(201).json({message: "registered"})
});

app.get("/profile", (req, res) => {
  res.send(`Fake Profile Page for user ${req.session.userId}`);
})

// fake login ends here//


app.use('/api/users', userApiRoutes);
app.use('/api/widgets', widgetApiRoutes);
app.use('/users', usersRoutes);
app.use('/menu', menuRoutes);
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

// app.get('/', (req, res) => {
//   res.render('index');
// });

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
