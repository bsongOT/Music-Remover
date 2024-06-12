const { convertToMP3 } = require("./convertToMP3");
const { downloadMusicService } = require("./download");
const { processService } = require("./process");
const fs = require("fs");

const uploadService = async (req, res) => {
  const filename = req.files[0].filename;
  const simpleName = filename.slice(0, filename.lastIndexOf('.'));
  const mrPath = `${__dirname.replace("/controllers", "")}/workspace/${simpleName}/accompaniment.wav`;
  
  await processService(filename);
  await convertToMP3(mrPath);
  res.sendFile(`${__dirname.replace("/controllers", "")}/workspace/mr.mp3`)
  fs.rmSync("workspace", { recursive: true, force: true })
};

module.exports = uploadService;
