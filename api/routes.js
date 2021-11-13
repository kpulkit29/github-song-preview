const express = require("express");
const router = express.Router();
const nodeHtmlToImage = require('node-html-to-image');
const { html } = require("../html");
const path = require("path");
const ytAPI = require('youtube-music-api');
const ytObject = new ytAPI();

const { massageSongData } = require("../utils");
router.get("/", (req, res, next) => {
    res.sendFile(path.join(__dirname,"client", "build", "index.html"));
  });
  
  router.post("/getSongList", async (req, res) => {
      await ytObject.initalize();
      let songs = await ytObject.search(req.body.name, "song");
  
      try {
          res.send(massageSongData(songs));
      } catch (error) {
        res.error("Something went wrong"); 
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

module.exports = router