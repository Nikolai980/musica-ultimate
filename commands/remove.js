const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args) => {
  const channel = message.member.voice.channel;
  if (!channel)
    return message.channel.send(
      "Трябва да сте влезли във гласов канал за да можете да използвате тази команда!"
    );
  if (!args[0])
    return message.channel.send(
      new MessageEmbed()
        .setDescription(":x: не е казан номер")
        .setColor("RED")
    );
  if (isNaN(args[0]))
    return message.channel.send(
      new MessageEmbed()
        .setDescription(":x: **Трябва да е [Пример: -remove 2]**")
        .setColor("RED")
    );
  let queue = message.client.queue.get(message.guild.id);
  if (args[0] == 1)
    return message.channel.send(
      new MessageEmbed()
        .setDescription(
          ":x: **Не можете да премахнете песента която е пусната в момента, за това използвайте командата skip**"
        )
        .setColor("RED")
    );
  if (queue.queue.length == 1)
    return message.channel.send(
      new MessageEmbed()
        .setDescription(
          ":x: **Не може да се махне песента когато е пусната само една, за това използвайте командата stop**"
        )
        .setColor("RED")
    );
  if (args[0] > queue.queue.length)
    return message.channel.send(
      new MessageEmbed()
        .setDescription(":x: **Тази опашка няма толкова песни**")
        .setColor("RED")
    );
  if (!queue)
    return message.channel.send(
      new MessageEmbed()
        .setDescription(":x: **Няма пуснати песни във този сървър**")
        .setColor("RED")
    );
  var name = queue.queue[args[0] - 1].name;
  queue.queue.splice(args[0] - 1);
  return message.channel.send(
    new MessageEmbed()
      .setDescription(
        "**Махната" + " " + name + " " + "от опашката :white_check_mark: **"
      )
      .setTimestamp()
      .setColor("GREEN")
  );
};
