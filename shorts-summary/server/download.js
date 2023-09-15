import ytdl from "ytdl-core"
import fs from "node:fs"
import { error } from "node:console"
import { resolve } from "node:path"

export const download = (videoID) =>
  new Promise((resolve, reject) => {
    const videoURL = "https://www.youtube.com/shorts/" + videoID
    //const videoURL = "https://www.youtube.com/shorts/" + videoID TFGAMLL68CA
    //const videoURL = "https://www.youtube.com/watch?v=" + videoID LebENTHnSaO
    console.log("Realizando o download do vídeo:", videoID)

    ytdl(videoURL, { quality: "lowestaudio", filter: "audioonly" })
      .on("info", (info) => {
        const seconds = info.formats[0].approxDurationMs / 1000
        if (seconds > 60) {
          throw new Error("A duração de vídeo é maior que 60 segundos.")
        }
      })
      .on("end", () => {
        console.log("Download do vídeo finalizado.")
        resolve()
      })
      .on("error", (error) => {
        console.log(
          "Não foi possível fazer o download do vídeo. Detalhes do erro:",
          error
        )
        reject(error)
      })
      .pipe(fs.createWriteStream("./tmp/audio.mp4"))
  })
