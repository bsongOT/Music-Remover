const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");

const convertToMP3 = (path) => new Promise(resolve => {
    ffmpeg(path)
    .setFfmpegPath(ffmpegPath)
    .toFormat("mp3")
    .on('end', () => {
        resolve()
    })
    .save("workspace/mr.mp3")
})

module.exports = {
    convertToMP3
}