const { spawn } = require("child_process");
const fs = require("fs");

const processService = async (filename) => {
  const isExists = fs.existsSync(`uploads/${filename}`);

  if (!isExists) return;

  console.log("processing");

  const spleeter = spawn("spleeter", [
    "separate",
    "-p",
    "spleeter:2stems-16kHz",
    "-o",
    "output/",
    `uploads/${filename}`,
  ]);

  // collect data from script
  spleeter.stdout.on("data", (data) => {
    console.log(`stdout:\n${data}`);
  });
  spleeter.stderr.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  spleeter.on("close", (code) => {
    console.log(`child process closed with code ${code}`);
    if (code !== 0) return;

  });
};

module.exports = {
  processService,
};
