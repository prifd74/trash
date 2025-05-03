const { EmbedBuilder } = require('discord.js');
const cooldowns = new Map();
const FooterIcon = 'https://cdn.discordapp.com/emojis/1347090809782272001.webp';
const TechICon = 'https://cdn.discordapp.com/emojis/1347090849909047409.gif';

const errors = [
  {
    keywords: ['staff', 'staff application'],
    embed: new EmbedBuilder()
      .setColor('#FF0000')
      .setTitle('🛠️ 𝗦𝘁𝗮𝗳𝗳 𝗔𝗽𝗽𝗹𝗶𝗰𝗮𝘁𝗶𝗼𝗻𝘀')
      .setAuthor({
        name: '💡 𝗪𝗲’𝗿𝗲 𝗵𝗲𝗿𝗲 𝘁𝗼 𝗵𝗲𝗹𝗽!',
        iconURL: TechICon,
        url: 'https://discord.gg/WdnP5DszsY'
      })
      .setFooter({ text: '📌 𝙏𝙝𝙞𝙨 𝙂𝙪𝙞𝙙𝙚 𝙈𝙞𝙜𝙝𝙩 𝙍𝙚𝙨𝙤𝙡𝙫𝙚 𝙔𝙤𝙪𝙧 𝙋𝙧𝙤𝙗𝙡𝙚𝙢!', iconURL: FooterIcon })
      .setTimestamp()
      .setDescription('📝 **To apply for staff,** create a ticket and fill out [this form](https://docs.google.com/forms/d/e/1FAIpQLSdjG1r-LcfQtCcPsbshtJJ9Ml7Fvk8bf9GAn9NhdBXuB4PMBw/viewform).')
  },
  {
    keywords: ['how to make ticket', 'ticket making'],
    embed: new EmbedBuilder()
      .setColor('#FF0000')
      .setTitle('🎫 𝗛𝗼𝘄 𝗧𝗼 𝗠𝗮𝗸𝗲 𝗔 𝗧𝗶𝗰𝗸𝗲𝘁')
      .setAuthor({
        name: '💡 𝗪𝗲’𝗿𝗲 𝗵𝗲𝗿𝗲 𝘁𝗼 𝗵𝗲𝗹𝗽!',
        iconURL: TechICon,
        url: 'https://discord.gg/WdnP5DszsY'
      })
      .setFooter({ text: '📌 𝙏𝙝𝙞𝙨 𝙂𝙪𝙞𝙙𝙚 𝙈𝙞𝙜𝙝𝙩 𝙍𝙚𝙨𝙤𝙡𝙫𝙚 𝙔𝙤𝙪𝙧 𝙋𝙧𝙤𝙗𝙡𝙚𝙢!', iconURL: FooterIcon })
      .setTimestamp()
      .setDescription('🛠️ **To make a ticket,** go to <#1368273942720282736> and select your desired option.')
      .setImage('https://i.ibb.co/LhZn3JGJ/Screenshot-2025-03-12-170516.png')
  },
  {
    keywords: ['partner', 'how to partner'],
    embed: new EmbedBuilder()
      .setColor('#FF0000')
      .setTitle('🤝 𝗣𝗮𝗿𝘁𝗻𝗲𝗿𝘀𝗵𝗶𝗽𝘀')
      .setAuthor({
        name: '💡 𝗪𝗲’𝗿𝗲 𝗵𝗲𝗿𝗲 𝘁𝗼 𝗵𝗲𝗹𝗽!',
        iconURL: TechICon,
        url: 'https://discord.gg/WdnP5DszsY'
      })
      .setFooter({ text: '📌 𝙏𝙝𝙞𝙨 𝙂𝙪𝙞𝙙𝙚 𝙈𝙞𝙜𝙝𝙩 𝙍𝙚𝙨𝙤𝙡𝙫𝙚 𝙔𝙤𝙪𝙧 𝙋𝙧𝙤𝙗𝙡𝙚𝙢!', iconURL: FooterIcon })
      .setTimestamp()
      .setDescription('▶️ **Follow these steps:**\n\n1️⃣ **Check** <#1351888783121055866>.\n2️⃣ **If you meet all the requirements,** create a ticket and we will reach out to you soon.')
  },
  {
    keywords: ['help'],
    embed: new EmbedBuilder()
      .setColor('#FF0000')
      .setTitle('❓ 𝗛𝗲𝗹𝗽')
      .setAuthor({
        name: '📌 𝗧𝗵𝗲 𝗪𝗼𝗿𝗱𝘀 𝗠𝘂𝘀𝘁 𝗕𝗲 𝗘𝘅𝗮𝗰𝘁 𝗙𝗼𝗿 𝗧𝗵𝗲 𝗚𝘂𝗶𝗱𝗲 𝗧𝗼 𝗪𝗼𝗿𝗸',
        iconURL: TechICon,
        url: 'https://discord.gg/WdnP5DszsY'
      })
      .setFooter({ text: '📌 𝙏𝙝𝙞𝙨 𝙂𝙪𝙞𝙙𝙚 𝙈𝙞𝙜𝙝𝙩 𝙍𝙚𝙨𝙤𝙡𝙫𝙚 𝙔𝙤𝙪𝙧 𝙋𝙧𝙤𝙗𝙡𝙚𝙢!', iconURL: FooterIcon })
      .setTimestamp()
      .setDescription('📋 **List of available support topics:**\n\n1️⃣ Staff Application\n2️⃣ How To Make Ticket\n3️⃣ Missing Permissions\n4️⃣ How to Partner')
  },
  {
    keywords: ['missing permissions', 'no permissions'],
    embed: new EmbedBuilder()
      .setColor('#FF0000')
      .setTitle('⚠️ 𝗠𝗶𝘀𝘀𝗶𝗻𝗴 𝗣𝗲𝗿𝗺𝗶𝘀𝘀𝗶𝗼𝗻𝘀')
      .setAuthor({
        name: '💡 𝗪𝗲’𝗿𝗲 𝗵𝗲𝗿𝗲 𝘁𝗼 𝗵𝗲𝗹𝗽!',
        iconURL: TechICon,
        url: 'https://discord.gg/WdnP5DszsY'
      })
      .setFooter({ text: '📌 𝙏𝙝𝙞𝙨 𝙂𝙪𝙞𝙙𝙚 𝙈𝙞𝙜𝙝𝙩 𝙍𝙚𝙨𝙤𝙡𝙫𝙚 𝙔𝙤𝙪𝙧 𝙋𝙧𝙤𝙗𝙡𝙚𝙢!', iconURL: FooterIcon })
      .setTimestamp()
      .setDescription('▶️ **Follow these steps:**\n\n1️⃣ **Check if your roles meet the required eligibility.**\n2️⃣ **If yes, create a ticket, and we will assist you soon.**')
  }
];

const allowedChannels = ['1368273810436133056', '1351562240599523358'];

module.exports = {
  name: 'error',
  description: 'Automatically responds to exact keyword matches.',
  cooldown: 3, 
  async execute(message) {
    const lowerContent = message.content.toLowerCase().trim();
    let matched = false;

    for (const error of errors) {
      for (const keyword of error.keywords) {
        if (lowerContent === keyword.toLowerCase().trim()) {
          message.reply({ embeds: [error.embed] });
          matched = true;
          break;
        }
      }
      if (matched) break;
    }
  }
};
