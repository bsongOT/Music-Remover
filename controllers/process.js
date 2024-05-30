const { spawn } = require("child_process");
const fs = require("fs");
const fs_extra = require("fs-extra");

const processService = async (filename) => {
  const isExists = fs.existsSync(`uploads/${filename}`);

  if (isExists) {
    console.log("processing");
    const trimmedFilename = filename?.toString()?.replace(".mp3", "");

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

      // res.sendFile(`output/${filename}/vocals.wav`, {
      //   root: __dirname.replace("routes", ""),
      // });

      //deleting uploaded  priginal audio file
      fs.unlink(`uploads/${filename}`, (err) => {
        if (err) throw err;
        console.log("successfully deleted the audio file");
      });

      //deleting the generated audio folder after 2 minutes
      setTimeout(() => {
        fs_extra.remove(`output/${trimmedFilename}`, (err) => {
          if (err) return console.error(err);
          console.log("folder deleted!");
        });
      }, 600000);
    });
  }
};

module.exports = {
  processService,
};
