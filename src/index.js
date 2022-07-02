require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");

const { json } = require("express");
const routes = require("./routes/routes.js");

const app = express();
app.use(json());

const path = require("path");
app.use('/static', express.static(path.join(__dirname, '../public')))


app.use("/", routes);

const port = process.env.PORT || 3000 ;

//connect to db
mongoose.connect(process.env.ConnectDB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

//Check for proper DB connection
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected to MongoDB successfully");
});





app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
