const fs = require("fs");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");

const downloadVocalService = async (name, res) => {
  const isExists = fs.existsSync(`output/${name}/vocals.wav`);

  if (!isExists) return res.status(200).json({message: "File not found"});
  
  res.sendFile(`output/${name}/vocals.wav`, {
    root: __dirname.replace("controllers", ""),
  });
};

const downloadMusicService = async (name, res) => {
  //const isExists = fs.existsSync(`output/${name}/accompaniment.wav`);

  //if (!isExists) return res.status(200).json({message: "File not found"});

  const mrPath = __dirname.replace("/controllers", "") + '/output/fly/accompaniment.wav';
  ffmpeg(mrPath)
  .setFfmpegPath(ffmpegPath)
  .toFormat("mp3")
  .on('end', () => {
    res.sendFile(__dirname.replace("/controllers", "") + '/mr.mp3')
  })
  .save("./mr.mp3")
  /*
  res.sendFile(__dirname.replace("/controllers", "") + `/output/${name}/accompaniment.wav`, {}, function(err){
    if (err){
      console.log(err);
    }
  });*/
  
};

module.exports = {
  downloadVocalService,
  downloadMusicService,
};
