const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const path = require("path");
const helpers = require("./utils/helpers");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sequelize = require("./config/connection");
const routes = require("./controllers");

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars
const hbs = exphbs.create({ helpers });
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static('utils'));

// Configure and use sessions
const sess = {
  secret: process.env.SECRET,
  cookie: {
    // Session expires after 10 minutes
    expires: 10 * 60 * 1000,
    secure: false,
    httpOnly: true,
    sameSite: "strict",
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({ db: sequelize }),
};
app.use(session(sess));

// Routes
app.use(routes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
