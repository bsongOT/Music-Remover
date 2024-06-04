const shortid = require("shortid");
const fs = require("fs");
const { processService } = require("./process");

const uploadService = async (req, res, next) => {
  const filename = req.files[0].filename;

  await processService(filename);
  res.status(200).json({
    message: "File uploaded successfully"
  });
};

module.exports = uploadService;