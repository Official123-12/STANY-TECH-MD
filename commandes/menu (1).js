const util = require('util');
const fs = require('fs-extra');
const { famous } = require(__dirname + "/../framework/famous");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../config");

famous({ nomCom: "menu", categorie: "Général" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre, prefixe, nomAuteurMessage, mybotpic } = commandeOptions;
    let { cm } = require(__dirname + "/../framework/famous");
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
𝗙𝗔𝗠𝗢𝗨𝗦-𝗠𝗗 𝑽1
     ╭──────────────
|❏│   *_Préfixe_* : ${s.PREFIXE}
|❏│   *_Propriétaire_* : ${s.OWNER_NAME}
|❏│   _Mode_ : ${mode}
|❏│   *_Commandes_* : ${cm.length}
|❏│   *_Date_* : ${date}
|❏│   *_Heure_* : ${temps}
|❏│   *_RAM_* : ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
|❏│   *_Plateforme_* : ${os.platform()}
|❏│   *_Développeur_* : *FAMOUS-TECH*
|❏│   *_PAYS_ : HAÏTI*
|❏|    𝘃𝗲𝗿𝘀𝗶𝗼𝗻    : 𝘝1.0.0
    ╰───────────────
╰─────✧𝗙𝗔𝗠𝗢𝗨𝗦-𝗠𝗗✧─────◆ \n\n`;
    
    let menuMsg = `
👋 Salut ${nomAuteurMessage}, je te présente le menu de FAMOUS-MD 👋

*Liste des commandes de FAMOUS-MD:*
◇                             ◇
`;

    if (commandeOptions.categorie) {
        const categorieSelectionnee = commandeOptions.categorie;
        if (coms[categorieSelectionnee]) {
            menuMsg += `╭────💫${categorieSelectionnee} ❏ ✧────`;
            for (const cmd of coms[categorieSelectionnee]) {
                menuMsg += `
*|🇭🇹│ ${cmd}*`;
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
*|🇭🇹│ ${cmd}*`;
            }
            menuMsg += `
╰═════════════⊷ \n`;
        }
    }

    menuMsg += `
◇            ◇
*»»————— ★ —————««*
"Pour utiliser une commande, insérez ${prefixe} suivi du nom de la commande."
 
    *𝑫é𝒗𝒆𝒍𝒐𝒑𝒑é 𝒑𝒂𝒓 𝑭𝑨𝑴𝑶𝑼𝑺-𝑻𝑬𝑪𝑯*
*»»—————    ★   —————««*
`;

    var lien = mybotpic();

    if (lien.match(/\.(mp4|gif)$/i)) {
        try {
            zk.sendMessage(dest, { video: { url: lien }, caption: infoMsg + menuMsg, footer: "Je suis *Famous-MD*, développé par FAMOUS-TECH" , gifPlayback : true }, { quoted: ms });
        } catch (e) {
            console.log("🥵🥵 Menu erreur " + e);
            repondre("🥵🥵 Menu erreur " + e);
        }
    } else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
        try {
            zk.sendMessage(dest, { image: { url: lien }, caption: infoMsg + menuMsg, footer: "Je suis *Famous-MD*, développé par FAMOUS-TECH" }, { quoted: ms });
        } catch (e) {
            console.log("🥵🥵 Menu erreur " + e);
            repondre("🥵🥵 Menu erreur " + e);
        }
    } else {
        repondre(infoMsg + menuMsg);
    }
});
