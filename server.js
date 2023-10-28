const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const path = require("path");
const SequelizeStore = require("connect-session-sequelize");
const dotenv = require("dotenv");

dotenv.config();

const sequelize = require("./config/connection");
const routes = require("./controllers");

const app = express();
const PORT = process.env.PORT || 3001;

app.set("view engine", "handlebars");

// Specify the location of your HTML templates
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine("handlebars" , exphbs());

// Serve static files
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static('utils'));

// Configure and use sessions
const sess = {
  secret: process.env.SECRET,
  cookie: {
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

// Sync Sequelize and drop/recreate tables 
sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
