const express = require("express");
const cors = require("cors");
const multer = require('multer')
const fs = require('fs');

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
  destination: function (req, file, cb) {
    if (!fs.existsSync("./workspace")) fs.mkdirSync("./workspace");
    cb(null, './workspace')
  },
})

const upload = multer({ storage })

const uploadService = require("./controllers/upload");
const {
  downloadMusicService,
  downloadVocalService,
} = require("./controllers/download");

const app = express();
const port = 8080;

app.use(cors());
app.set('view engine', 'ejs');
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/api/upload", upload.any("file"), uploadService);
app.get("/api/download/vocal", downloadVocalService);
app.get("/api/download/music", downloadMusicService);

app.listen(port, () =>
  console.log(`Vocals Splitter listening on port 
${port}!`)
);
