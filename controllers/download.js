const fs = require("fs");

const downloadVocalService = async (req, res) => {
  const isExists = fs.existsSync(`output/${req.filename}/vocals.wav`);

  if (isExists) {
    res.sendFile(`output/${req.filename}/vocals.wav`, {
      root: __dirname.replace("controllers", ""),
    });
  } else {
    res.status(200).json({
      message: "File not found",
      isProcessed: false,
    });
  }
};

const downloadMusicService = async (req, res) => {
  const isExists = fs.existsSync(`output/${req.filename}/vocals.wav`);

  if (isExists) {
    res.sendFile(`output/${req.filename}/accompaniment.wav`, {
      root: __dirname.replace("controllers", ""),
    });
  } else {
    res.status(200).json({
      message: "File not found",
      isProcessed: false,
    });
  }
};

module.exports = {
  downloadVocalService,
  downloadMusicService,
};