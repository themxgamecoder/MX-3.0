let handler = async (m, { conn }) => {
  let user = global.db.data.users[m.sender];
  let name = conn.getName(m.sender);
  let taguser = '@' + m.sender.split('@s.whatsapp.net')[0];
  let av = `./msgamecoder/${pickRandom(['mx', 'mx1'])}.mp3`;

  conn.sendButton(m.chat, `*HELLO FROM MΞKΛ 𝖆𝖎*\n        Morning or Evening\n\n @${m.sender.split('@')[0]}     \n\n*You called me what is your problem bro?* `.trim(), igfg, null, [['OWNER HELP', '.grp'], ['GET SC', '.repo']], m, { mentions: [m.sender] });
  conn.sendFile(m.chat, av, 'audio.mp3', null, m, true, { type: 'audioMessage', ptt: true });
}

handler.customPrefix = /^(bot|mx)$/i;
handler.command = new RegExp();
export default handler;

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())];
}
