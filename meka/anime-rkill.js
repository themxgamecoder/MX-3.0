
import fetch from 'node-fetch'
import { sticker } from '../mxgamecoder/sticker.js'
let handler = async (m, { conn, args, usedPrefix, command }) => {
	
	  let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
    else who = m.chat
    if (!who) throw `✳️ ${mssg.noMention}\n\n📌 ${mssg.example} : ${usedPrefix + command} @tag` 
    
   let name = conn.getName(who) 
   let name2 = conn.getName(m.sender) 
   m.react(rwait)

  let rki = await fetch(`https://api.waifu.pics/sfw/kill`)
    if (!rki.ok) throw await rki.text()
   let jkis = await rki.json()
   let { url } = jkis
   let stiker = await sticker(null, url, `(${name2}) ${mssg.killmsg}`, `${name}`)
   conn.sendFile(m.chat, stiker, null, { asSticker: true }, m)
   m.react('🗡️') 
   
}

handler.help = ['kill @tag']
handler.tags = ['rnime']
handler.command = /^(kill|matar)$/i
handler.diamond = true
handler.group = true

export default handler
