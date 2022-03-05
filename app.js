const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const route = require("./routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extends: true }));
app.use(cors());
app.use(morgan("dev"));

app.use(route);

app.listen(3000, () => {
  console.log("Server is run");
});
