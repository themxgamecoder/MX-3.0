//import db from '../lib/database.js'
import { canLevelUp } from '../mxgamecoder/levelling.js'

export async function before(m, { conn }) {
    let user = global.db.data.users[m.sender]
    if (!user.autolevelup)
        return !0
    let before = user.level * 1
    while (canLevelUp(user.level, user.exp, global.multiplier))
        user.level++
    user.role = global.rpg.role(user.level).name
    if (before !== user.level) {
        m.reply(`
*🎉 YOU LEVELED UP*

 *${before}* ‣  *${user.level}*
 Range : *${user.role}*
`.trim())
    }
} 

