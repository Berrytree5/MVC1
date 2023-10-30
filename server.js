// Imports
const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controllers");
const helpers = require("./utils/helpers");

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js 
const hbs = exphbs.create({ helpers });

// Define session cookie properties
const sessionConfig = {
  secret: "longrandompass3431", 
  cookie: {
    maxAge: 1200000, // Session expiration time (in milliseconds)
    httpOnly: true, // Ensure cookies are only accessible via HTTP(S)
    secure: false, // Set to true when using HTTPS
    sameSite: "strict", // Protect against cross-site request forgery (CSRF) attacks
  },
  resave: false, // Don't save sessions if unmodified
  saveUninitialized: true, // Save new sessions
  store: new SequelizeStore({
    db: sequelize, // Use Sequelize for session storage
  }),
};

app.use(session(sessionConfig));

// Set the view engine to Handlebars
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Middleware
app.use(express.json()); // Parse JSON data
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded form data
app.use(express.static(path.join(__dirname, "public"))); // Serve static files from the "public" directory

app.use(routes); // Use the defined routes

// Synchronize Sequelize with the database
sequelize.sync({  }).then(() => {
  app.listen(PORT, () => {
    console.log("Server is now listening on port " + PORT);
  });
});
