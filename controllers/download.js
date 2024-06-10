const fs = require("fs");

const downloadVocalService = async (name, res) => {
  const isExists = fs.existsSync(`output/${name}/vocals.wav`);

  if (!isExists) return res.status(200).json({message: "File not found"});
  
  res.sendFile(`output/${name}/vocals.wav`, {
    root: __dirname.replace("controllers", ""),
  });
};

const downloadMusicService = async (name, res) => {
  const isExists = fs.existsSync(`output/${name}/accompaniment.wav`);

  if (!isExists) return res.status(200).json({message: "File not found"});

  console.log(__dirname);

  res.sendFile(__dirname.replace("/controllers", "") + `/output/${name}/accompaniment.wav`, {}, function(err){
    if (err){
      console.log(err);
    }
  });
  
};

module.exports = {
  downloadVocalService,
  downloadMusicService,
};
