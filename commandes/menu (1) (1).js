const util = require('util');
const fs = require('fs-extra');
const { famous } = require(__dirname + "/../framework/zokou"");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");

famous({ nomCom: "menu5", categorie: "Général" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre, prefixe, nomAuteurMessage, mybotpic } = commandeOptions;
    let { cm } = require(__dirname + "/../framework/zokou"");
    var coms = {};
    var mode = "public";
    
    if ((s.MODE).toLocaleLowerCase() != "yes") {
        mode = "private";
    }

    cm.map(async (com, index) => {
        if (!coms[com.categorie])
            coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault('Etc/GMT');

    const temps = moment().format('HH:mm:ss');
    const date = moment().format('DD/MM/YYYY');

    let infoMsg = `
╭────✧${s.BOT}✧────◆
𝐁𝐎𝐍𝐈𝐏𝐇𝐀𝐂𝐄~𝐌𝐃
     ╭──────────────
|❏│   *_Préfixe_* : ${s.PREFIXE}
|❏│   *_Propriétaire_* : ${s.OWNER_NAME}
|❏│   _Mode_ : ${mode}
|❏│   *_Commandes_* : ${cm.length}
|❏│   *_Date_* : ${date}
|❏│   *_hour_* : ${temps}
|❏│   *_RAM_* : ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
|❏│   *_Plateforme_* : ${os.platform()}
|❏│   *_Developer_* : *BONIPHACE-TECH*
|❏│   *_PAYS_ : HAÏTI*
|❏|    𝘃𝗲𝗿𝘀𝗶𝗼𝗻    : 𝘝14.0.0
    ╰───────────────
╰─────✧𝐁𝐎𝐍𝐈𝐏𝐇𝐀𝐂𝐄~𝐌𝐃✧─────◆ \n\n`;
    
    let menuMsg = `
👋 𝐡𝐞𝐥𝐥𝐨𝐰 ${nomAuteurMessage}, 𝐈'𝐦 𝐁𝐎𝐍𝐈𝐏𝐇𝐀𝐂𝐄 👋

*𝐖𝐞𝐥𝐜𝐨𝐦𝐞 𝐭𝐨 𝐁𝐎𝐍𝐈𝐏𝐇𝐀𝐂𝐄~𝐌𝐃:*
◇                             ◇
`;

    if (commandeOptions.categorie) {
        const categorieSelectionnee = commandeOptions.categorie;
        if (coms[categorieSelectionnee]) {
            menuMsg += `╭────💫${categorieSelectionnee} ❏ ✧────`;
            for (const cmd of coms[categorieSelectionnee]) {
                menuMsg += `
*|🇹🇿│ ${cmd}*`;
            }
            menuMsg += `
╰═════════════⊷\n`;
        } else {
            menuMsg += `La catégorie "${categorieSelectionnee}" n'existe pas.\n`;
        }
    } else {
        for (const cat in coms) {
            menuMsg += `╭────💫${cat} ❏ ✧────`;
            for (const cmd of coms[cat]) {
                menuMsg += `
*|🇹🇿│ ${cmd}*`;
            }
            menuMsg += `
╰═════════════⊷ \n`;
        }
    }

    menuMsg += `
◇            ◇
*»»————— ★ —————««*
"Pour utiliser une commande, insérez ${prefixe} suivi du nom de la commande."
 
    *𝑫𝐞𝐯𝐞𝐥𝐨𝐩𝐞𝐝 𝐛𝐲 𝐁𝐎𝐍𝐈𝐏𝐇𝐀𝐂𝐄-𝑻𝑬𝑪𝑯*
*»»—————    ★   —————««*
`;

    var lien = mybotpic();

    if (lien.match(/\.(mp4|gif)$/i)) {
        try {
            zk.sendMessage(dest, { video: { url: lien }, caption: infoMsg + menuMsg, footer: "Je suis *Boniphace-MD*, développé par BONIPHACE-TECH" , gifPlayback : true }, { quoted: ms });
        } catch (e) {
            console.log("🥵🥵 Menu erreur " + e);
            repondre("🥵🥵 Menu erreur " + e);
        }
    } else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
        try {
            zk.sendMessage(dest, { image: { url: lien }, caption: infoMsg + menuMsg, footer: "Je suis *Boniphace-MD*, développé par BONIPHACE-TECH" }, { quoted: ms });
        } catch (e) {
            console.log("🥵🥵 Menu erreur " + e);
            repondre("🥵🥵 Menu erreur " + e);
        }
    } else {
        repondre(infoMsg + menuMsg);
    }
});
