const express = require("express");
const app = express();
const bodyParser = require("body-parser");
// const multer = require("multer");
// const forms = multer();
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

require("dotenv").config();
const port = process.env.PORT || 5000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// app.use(forms.array());

app.use(
  cors({
    origin: [process.env.CLINT_URL],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(cookieParser());

app.set("trust proxy", 1); // trust first proxy

app.use(
  session({
    key: "fitness_server_cookies",
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 },
  })
);

app.use(express.static(`${__dirname}/public`));

app.use(fileUpload({}));

// Database Connection
mongoose.connect(process.env.DATABASE_URL);

mongoose.connection.on("open", () => {
  console.log("Database Connected Successfully!");
});

mongoose.connection.on("error", () => {
  console.log("Database Connection Failed!");
});

const indexRoute = require("./routes/index");
const postsRoute = require("./routes/posts");
const usersRoute = require("./routes/users");
const uploadRoute = require("./routes/uploadImage");

app.use("/", indexRoute);
app.use("/posts", postsRoute);
app.use("/users", usersRoute);
app.use("/upload", uploadRoute);

// Listen Port
app.listen(port, (err) => {
  if (err) {
    console.log("Server connection failed!");
  }
  console.log(`Server connected Successfully at PORT ${port}.`);
});
