const express = require("express");
const router = express.Router();
const nodeHtmlToImage = require('node-html-to-image');
const { html } = require("../html");
const path = require("path");
const ytAPI = require('youtube-music-api');
const ytObject = new ytAPI();
const atob = require("atob");

const { massageSongData } = require("../utils");
router.get("/", (req, res, next) => {
    res.sendFile(path.join(__dirname,"client", "build", "index.html"));
  });
  
  router.post("/getSongList", async (req, res, next) => {
      await ytObject.initalize();
      let songs = await ytObject.search(req.body.name, "song");
  
      try {
          res.send(massageSongData(songs));
      } catch (error) {
        console.log(error);
        next("Something went wrong"); 
      }
  });
  
  router.get("/song", async (req, res) => {
      await ytObject.initalize();
      let { content } = await ytObject.search("Can I call you back", "song");
      console.log(content.map(item => item.thumbnails));
      res.send("1");
  })
  
  router.get("/preview", async function(req, res) {
    let  { sUrl, st, ed, txt, name, artist } = req.query;
  
    sUrl = atob(sUrl);
    st = atob(st);
    ed = atob(ed);
    txt = atob(txt);
    name = atob(name);
    artist = atob(artist);
    const image = await nodeHtmlToImage({
      html,
      content: {sUrl, st, ed, txt, name, artist}
    });
    res.writeHead(200, { "Content-Type": "image/png" });
    res.end(image, "base64");
  });

module.exports = router