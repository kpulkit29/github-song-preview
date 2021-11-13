const express = require('express');
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const songsApi = require("./api/routes");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, "..", "build")));
app.use("/", songsApi);

app.listen(80, () => {
  console.log('listening on *:80');
});
