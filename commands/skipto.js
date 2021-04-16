const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args) => {
  const channel = message.member.voice.channel;
  if (!channel)
    return message.channel.send(
     "Трябва да сте влезли във гласов канал за да можете да използвате тази команда!"
    );
  let queue = message.client.queue.get(message.guild.id);
  if (!queue)
    return message.channel.send(
      new MessageEmbed()
        .setDescription(":x: В момента няма пусната музика въвъ този сървър")
        .setColor("RED")
    );
  if (!args[0])
    return message.channel.send(
      new MessageEmbed()
        .setDescription("**Трябва да кажете колко песни ще пропуснете** :x:")
        .setColor("RED")
    );
  if (isNaN(args[0]))
    return message.channel.send(
      new MessageEmbed()
        .setDescription("**Трябва да е число** :x:")
        .setColor("RED")
    );
  queue.playing = !false;

  if (queue.loop) {
    for (let i = 0; i < parseInt(args[0]) - (1 + 1); i++) {
      var delta = queue.queue.shift();
      queue.queue.push(delta);
    }
  } else {
    queue.queue = queue.queue.slice(parseInt(args[0]) - (1 + 1));
  }

  try {
    queue.connection.dispatcher.end();
  } catch (e) {
    console.log(e);
    message.client.queue.delete(message.guild.id);
    queue.vc.leave();
  }

  return message.channel.send(
    new MessageEmbed()
      .setDescription(
        "**Пропусната е музиката до" +
          " `" +
          args[0] +
          "` " +
          ":white_check_mark:**"
      )
      .setColor("YELLOW")
  );
};
