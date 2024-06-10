const { spawn } = require("child_process");
const fs = require("fs");

const processService = (filename) => {
  return new Promise(resolve => {
    const isExists = fs.existsSync(`uploads/${filename}`);

    if (!isExists) return resolve("File Not Found")

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
      resolve()
    });
  })
};

module.exports = {
  processService,
};
