const express = require('express');
const ytAPI = require('youtube-music-api');
const app = express();
const nodeHtmlToImage = require('node-html-to-image');
const { html } = require("./html");
const path = require("path");
const ytObject = new ytAPI();
const bodyParser = require("body-parser");
const { massageSongData } = require("./utils");
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, "..", "build")));
// app.use(express.static("public"));

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

app.post("/getSongList", async (req, res) => {
    await ytObject.initalize();
    let songs = await ytObject.search(req.body.name, "song");

    try {
        res.send(massageSongData(songs));
    } catch (error) {
      res.error("Something went wrong"); 
    }
});

app.get("/song", async (req, res) => {
    await ytObject.initalize();
    let { content } = await ytObject.search("Can I call you back", "song");
    console.log(content.map(item => item.thumbnails));
    res.send("1");
})

app.get("/preview", async function(req, res) {
  let  { sUrl, st, ed, txt, name, artist } = req.query;

  sUrl = decodeURIComponent(sUrl);
  st = decodeURIComponent(st);
  ed = decodeURIComponent(ed);
  txt = decodeURIComponent(txt);
  const image = await nodeHtmlToImage({
    html,
    content: {sUrl, st, ed, txt, name, artist}
  });
  res.writeHead(200, { "Content-Type": "image/png" });
  res.end(image, "base64");
});

app.listen(3000, () => {
  console.log('listening on *:3000');
});
