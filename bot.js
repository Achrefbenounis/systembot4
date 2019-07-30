
1.const Discord = require('discord.js');


2.const client = new Discord.Client();


3.var prefix = "#"


4. 


5.client.on('message', message => {


6.    var p = message.mentions.members.first();


7.    var reason = message.content.split(" ").slice(2).join(' ');


8.    var log = message.guild.channels.find('name', 'warns-log');


9.    if(message.content.startsWith(`${prefix}warn`)){


10.        if(!p) return message.reply(`**منشن الشخص اول**`);


11.        if(!reason) return message.reply(`**حط سبب**`);


12.        if(!p.bannable) return message.reply(`**مقدر اعطي وورن لشخص من الادارة**`);


13.        reason = reason.replace('1', "**كتابة الاوامر بالشات العام**");


14.        reason = reason.replace('2', "**بيع اشياء**");


15.        reason = reason.replace('3', "**التحذث عن السياسة**");


16.        reason = reason.replace('4', "**التحذث عن الدين **");


17.        reason = reason.replace('5', "**التحدث عن الطائفية**");


18.        reason = reason.replace('6', "**السبام**");


19.        reason = reason.replace('7', "**فتح تذكرة من دون سبب**");


20.        reason = reason.replace('8', "**العنصرية**");


21.        reason = reason.replace('9', "**عدم الاحترام**");


22.        reason = reason.replace('10', "**نشر بالعام**");


23.        var embed = new Discord.RichEmbed()


24.        .setAuthor(`تم التحذير`)


25.        .addField(`Name ♣`, `<@${p.id}>`)


26.        .addField(`By ♣`, `<@${message.author.id}>`)


27.        .addField(`Reason ♣`, reason)


28.        .setTimestamp()


29.        .setColor("WHITE")


30.        .setFooter(` `)


31.        message.channel.send(`${p} ${reason}`)


32.            message.delete();


33.        log.send({embed});


34.        warnRoles = ['warn1']


35.    }


36.});


37.///////////


38.client.on('message', message => {


39.    var p = message.mentions.members.first();


40.    var reason = message.content.split(" ").slice(2).join(' ');


41.    var log = message.guild.channels.find('name', 'ban-log');


42.    if(message.content.startsWith(`#{prefix}ban`)){


43.        if(!p) return message.reply(`**منشن الشخص**`);


44.        if(!reason) return message.reply(`**حط سبب**`);


45.        if(!p.bannable) return message.reply(`**م اقدر ابتد شخص من الستاف**`);


46.        reason = reason.replace('1', "**نشر في الخاص**");


47.        reason = reason.replace('2', "**اسم غير لائق**");


48.        reason = reason.replace('3', "**صوره غير لائقه**");


49.        reason = reason.replace('4', "**اسم غير لآئق**");


50.        reason = reason.replace('5', "**سب الاهل**");


51.        var embed = new Discord.RichEmbed()


52.        .setAuthor(`User Banned!`)


53.        .addField(`Name ♣`, `<@${p.id}>`)


54.        .addField(`By ♣`, `<@${message.author.id}>`)


55.        .addField(`Reason ♣`, reason)


56.        .setTimestamp()


57.        .setColor("BLACK")


58.        .setFooter(` `)


59.        p.ban();


60.            message.delete();


61.        log.send({embed});


62.        banRoles = ['baned']


63.    }


64.});


65.///////////////////////////


66.client.on('message',async message => {


67.  var room;


68.  var title;


69.  var duration;


70.  var gMembers;


71.  var filter = m => m.author.id === message.author.id;


72.  if(message.content.startsWith(prefix + "giveaway")) {


73.     //return message.channel.send(':heavy_multiplication_x:| **هذا الامر معطل حاليا.. ``حاول في وقت لاحق``**');


74.    if(!message.guild.member(message.author).hasPermission('MANAGE_GUILD')) return message.channel.send(':heavy_multiplication_x:| **يجب أن يكون لديك خاصية التعديل على السيرفر**');


75.    message.channel.send(`:eight_pointed_black_star:| **من فضلك اكتب اسم الروم**`).then(msgg => {


76.      message.channel.awaitMessages(filter, {


77.        max: 1,


78.        time: 20000,


79.        errors: ['time']


80.      }).then(collected => {


81.        let room = message.guild.channels.find('name', collected.first().content);


82.        if(!room) return message.channel.send(':heavy_multiplication_x:| **لم اقدر على ايجاد الروم المطلوب**');


83.        room = collected.first().content;


84.        collected.first().delete();


85.        msgg.edit(':eight_pointed_black_star:| **اكتب مدة القيف اواي بالدقائق , مثال : 60**').then(msg => {


86.          message.channel.awaitMessages(filter, {


87.            max: 1,


88.            time: 20000,


89.            errors: ['time']


90.          }).then(collected => {


91.            if(isNaN(collected.first().content)) return message.channel.send(':heavy_multiplication_x:| **يجب عليك ان تحدد وقت زمني صحيح.. ``يجب عليك اعادة كتابة الامر``**');


92.            duration = collected.first().content * 60000;


93.            collected.first().delete();


94.            msgg.edit(':eight_pointed_black_star:| **واخيرا اكتب على ماذا تريد القيف اواي**').then(msg => {


95.              message.channel.awaitMessages(filter, {


96.                max: 1,


97.                time: 20000,


98.                errors: ['time']


99.              }).then(collected => {


100.                title = collected.first().content;


101.                collected.first().delete();


102.                try {


103.                  let giveEmbed = new Discord.RichEmbed()


104.                  .setAuthor(message.guild.name, message.guild.iconURL)


105.                  .setTitle(title)


106.                  .setDescription(`المدة : ${duration / 60000} دقائق`)


107.                  .setFooter(message.author.username, message.author.avatarURL);


108.                  message.guild.channels.find('name', room).send(giveEmbed).then(m => {


109.                     let re = m.react('💖');


110.                     setTimeout(() => {


111.                       let users = m.reactions.get("💖").users;


112.                       let list = users.array().filter(u => u.id !== m.author.id);


113.                       let gFilter = list[Math.floor(Math.random() * list.length) + 0];


114.                         if(users.size === 1) gFilter = '**لم يتم التحديد**';


115.                       let endEmbed = new Discord.RichEmbed()


116.                       .setAuthor(message.author.username, message.author.avatarURL)


117.                       .setTitle(title)


118.                       .addField('انتهى القيف اواي !',`الفائز هو : ${gFilter}`)


119.                       .setFooter(message.guild.name, message.guild.iconURL);


120.                       m.edit(endEmbed);


121.                     },duration);


122.                   });


123.                  msgg.edit(`:heavy_check_mark:| **تم اعداد القيف اواي**`);


124.                } catch(e) {


125.                  msgg.edit(`:heavy_multiplication_x:| **لم اقدر على اعداد القيف اواي بسبب نقص الخصائص**`);


126.                  console.log(e);


127.                }


128.              });


129.            });


130.          });


131.        });


132.      });


133.    });


134.  }


135.});


136.////////


137.client.on('message', async message => {


138. 


139.if(message.content.startsWith( prefix + 'invite')) {


140.        let oi = message.mentions.users.first() ? message.mentions.users.first().id : message.author.id;


141.        let Tag = message.mentions.users.first() ? message.mentions.users.first().tag : message.author.tag;


142.        let Username = message.mentions.users.first() ? message.mentions.users.first().username : message.author.username;


143.        let Avatar = message.mentions.users.first() ? message.mentions.users.first().avatarURL : message.author.avatarURL;


144.       


145.        message.guild.fetchInvites().then(invs => {


146.            let member = client.guilds.get(message.guild.id).members.get(oi);


147.            let personalInvites = invs.filter(i => i.inviter.id === oi);


148.            let urll = invs.filter(i => i.inviter.id === oi);


149.            let link = urll.reduce((p , v) => v.url +` , Total de membros recrutados no convite: ${v.uses}.\n`+ p, `\nServidor: ${message.guild.name} \n `);


150.            let inviteCount = personalInvites.reduce((p, v) => v.uses + p, 0);


151.            let inviteCode = personalInvites.reduce((p, v) => v.code);


152.            let possibleInvites = [['Total de membros recrutados:']];


153.            possibleInvites.push([inviteCount, inviteCode]);


154.            let user = message.mentions.users.first() || message.author;


155.            let mem = message.guild.member(user);


156.            let millisJoined = new Date().getTime() - mem.joinedAt.getTime();


157.            let daysJoined = millisJoined / 1000 / 60 / 60 / 24;


158.           


159.            var inviteInfo = new Discord.RichEmbed()


160.            .setTitle(`:incoming_envelope: **[INVITE INFO]** ${Username}`)


161.            .setThumbnail(client.user.avatarURL)


162.            .addField('**الدعوات**', `**➥** [ شخص **${Number(inviteCount)}** ]`)


163.            .addField('**تم الانضمام للسيرفر من**', `**➥** [ يوم **${daysJoined.toFixed(0)}** ]`)


164.            .addField('**رابط دعوة الانضمام**', `**➥** [ **https://discord.gg/${inviteCode || 'Zm2U6we'}** ]`)


165.            .setColor('ORANGE')


166.            .setTimestamp()


167.            .setFooter(Tag, Avatar)


168.           


169.            message.channel.send(inviteInfo);


170.            });


171.    };


172.});


173.//////////////////////////////////


174.var config = {


175.  events: [


176.    {type: "CHANNEL_CREATE", logType: "CHANNEL_CREATE", limit: 10 , delay: 5000},


177.    {type: "CHANNEL_DELETE", logType: "CHANNEL_DELETE", limit: 10, delay: 5000},


178.    {type: "GUILD_MEMBER_REMOVE", logType: "MEMBER_KICK", limit: 10, delay: 5000},


179.    {type: "GUILD_BAN_ADD", logType: "MEMBER_BAN_ADD", limit: 10, delay: 5000},


180.    {type: "GUILD_ROLE_CREATE", logType: "ROLE_CREATE", limit: 10, delay: 5000},


181.    {type: "GUILD_ROLE_DELETE", logType: "ROLE_DELETE", limit: 10, delay: 5000},


182.  ]


183.}


184.client.on("error", (e) => console.error(e));


185.client.on("raw", (packet)=> {


186.  let {t, d} = packet, type = t, {guild_id} = data = d || {};


187.  if (type === "READY") {


188.    client.startedTimestamp = new Date().getTime();


189.    client.captures = [];


190.  }


191.  let event = config.events.find(anEvent => anEvent.type === type);


192.  if (!event) return;


193.  let guild = client.guilds.get(guild_id);


194.  if (!guild) return;


195.  guild.fetchAuditLogs({limit : 1, type: event.logType})


196.    .then(eventAudit => {


197.      let eventLog = eventAudit.entries.first();


198.      if (!eventLog) return;


199.      let executor = eventLog.executor;


200.      guild.fetchAuditLogs({type: event.logType, user: executor})


201.        .then((userAudit, index) => {


202.          let uses = 0;


203.          userAudit.entries.map(entry => {


204.            if (entry.createdTimestamp > client.startedTimestamp && !client.captures.includes(index)) uses += 1;


205.          });


206.          setTimeout(() => {


207.            client.captures[index] = index


208.          }, event.delay || 2000)


209.          if (uses >= event.limit) {


210.            client.emit("reachLimit", {


211.              user: userAudit.entries.first().executor,


212.              member: guild.members.get(executor.id),


213.              guild: guild,


214.              type: event.type,


215.            })


216.          }


217.        }).catch(console.error)


218.    }).catch(console.error)


219.});


220.client.on("reachLimit", (limit)=> {


221.  let log = limit.guild.channels.find( channel => channel.name === "security-log");


222.  log.send(limit.user.username+"\** سيرفر بيتهكر ! ** ");


223.  limit.guild.owner.send(limit.user.username+"\** سيرفرك بيتهكر ! ** ")


224.  limit.member.roles.map(role => {


225.    limit.member.removeRole(role.id)


226.    .catch(log.send)


227.  });


228.});


229.///////


230.client.on('message', message => {


231.    if(message.content.startsWith(prefix + 'new')) {


232.        let args = message.content.split(' ').slice(1).join(' ');


233.        let support = message.guild.roles.find("name","Support Team");


234.        let ticketsStation = message.guild.channels.find("name", "TICKETS.");


235.        if(!args) {


236.            return message.channel.send('**المرجو كتآبة موضوع للتذكرة**');


237.        };


238.                if(!support) {


239.                    return message.channel.send('** من فضلك قم بإنشاء رتبة اسمها `Support Team` **');


240.                };


241.            if(!ticketsStation) {


242.                message.guild.createChannel("TICKETS.", "category");


243.            };


244.                message.guild.createChannel(`ticket-${message.author.username}`, "text").then(ticket => {


245.                    message.delete()


246.                        message.channel.send(`Your ticket has been created. [ ${ticket} ]`);


247.                    ticket.setParent(ticketsStation);


248.                    ticketsStation.setPosition(1);


249.                        ticket.overwritePermissions(message.guild.id, {


250.                            SEND_MESSAGES: false,


251.                            READ_MESSAGES: false


252.                        });


253.                            ticket.overwritePermissions(support.id, {


254.                                SEND_MESSAGES: true,


255.                                READ_MESSAGES: true


256.                            });


257.                                ticket.overwritePermissions(message.author.id, {


258.                                    SEND_MESSAGES: true,


259.                                    READ_MESSAGES: true


260.                                });


261.                    let embed = new Discord.RichEmbed()


262.                                .setTitle('**New Ticket.**')


263.                                .setColor("RANDOM")


264.                                .setThumbnail(`${message.author.avatarURL}`)


265.                                .addField('Subject', args)


266.                                .addField('Author', message.author)


267.                                .addField('Channel', `<#${message.channel.id}>`);


268. 


269.                                ticket.sendEmbed(embed);


270.                }) .catch();


271.    }


272.    if(message.content.startsWith(prefix + 'close')) {


273.            if(!message.member.hasPermission("ADMINISTRATOR")) return;


274.        if(!message.channel.name.startsWith("ticket")) {


275.            return;


276.        };  


277.                let embed = new Discord.RichEmbed()


278.                    .setAuthor("أعد الامر ، لديك 20 ثآنية")


279.                    .setColor("RANDOM");


280.                    message.channel.sendEmbed(embed) .then(codes => {


281. 


282.                   


283.                        const filter = msg => msg.content.startsWith(prefix + 'close');


284.                        message.channel.awaitMessages(response => response.content === prefix + 'close', {


285.                            max: 1,


286.                            time: 20000,


287.                            errors: ['time']


288.                        })


289.                        .then((collect) => {


290.                            message.channel.delete();


291.                        }) .catch(() => {


292.                            codes.delete()


293.                                .then(message.channel.send('**تم إلغاء العملية**')) .then((c) => {


294.                                    c.delete(4000);


295.                                })


296.                                   


297.                           


298.                        })


299. 


300. 


301.                    })


302. 


303. 


304.           


305.    }


306.});


307.//////


308.client.on("guildMemberAdd", member => {


309.  client.channels.find('id', '578602181368872960').send(` **Welcome To .. Server**  `)


310.});


311./////////


312.client.on('message', msg => {


313.    if(msg.content === '$help')


314.    msg.reply('Check Your DM :white_check_mark:')


315.  });


316. 


317. 


318.  client.on("message", message => {


319.    if (message.content === "$help") {


320.     const embed = new Discord.RichEmbed()


321.         .setColor("#00FF00")


322.         .setThumbnail(message.author.avatarURL)


323.         .setDescription(`**Help|هيلب


324.       $invites | لمعرفة عدد انفايتاتك


325.       $new | لإنشاء تكت


326.       $giveaway  |  لإعداد قيفاواي


327.       ** `)


328.   message.author.sendEmbed(embed)


329.   


330.   }


331.   });


332./////


333.client.login('NjA1NzU0MzgxNDIxMjQ4NTM0.XUBG7A.sqH3GjhUAMz3qfcVX9KrpqBOTcM');
