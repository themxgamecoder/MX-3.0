import uploadFile from '../mxgamecoder/uploadFile.js'
import uploadImage from '../mxgamecoder/uploadImage.js'
import { webp2png } from '../mxgamecoder/webp2mp4.js'
import fetch from 'node-fetch'

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
  var out

  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || q.mediaType || ''
  if (/video/g.test(mime)) {
    return m.reply('video files not supported!')
  }
  if (!/webp|image|viewOnce/g.test(mime))
    return m.reply(`Reply media with\n${usedPrefix + command}`)
  let img = await q.download?.()

  if (/webp/g.test(mime)) {
    out = await webp2png(img)
  } else if (/image/g.test(mime)) {
    out = await uploadImage(img)
  } else if (/viewOnce/g.test(mime)) {
    out = await uploadFile(img)
  }
  //await m.reply(wait)
  await displayLoadingScreen(conn, m.chat)
  try {
    let res
    if (args[0]) {
      res = await (
        await fetch(
          'https://api.ocr.space/parse/imageurl?apikey=K88889328888957&url=' +
            out +
            '&language=' +
            args[0]
        )
      ).json()
    } else {
      res = await (
        await fetch('https://api.ocr.space/parse/imageurl?apikey=K88889328888957&url=' + out)
      ).json()
    }
    await m.reply('*OCR RESULT*\n\n' + res.ParsedResults[0].ParsedText)
  } catch (e) {
    throw `some error occured!\n\n${e}`
  }
}
handler.help = ['ocr']
handler.tags = ['tools']
handler.command = /^ocr$/i

export default handler
