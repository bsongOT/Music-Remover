const { downloadMusicService } = require("./download");
const { processService } = require("./process");

const uploadService = async (req, res) => {
  const filename = req.files[0].filename;
  const simpleName = filename.slice(0, filename.lastIndexOf('.'));

  //await processService(filename);
  await downloadMusicService(simpleName, res);
};

module.exports = uploadService;
