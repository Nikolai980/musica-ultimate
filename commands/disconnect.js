const { MessageEmbed } = require("discord.js");

exports.run = async (client, message) => {
  const channel = message.member.voice.channel;
  if (!channel)
    return message.channel.send(
      "Трябва да сте влезли във гласов канал за да можете да използвате тази команда!"
    );

  await channel.leave();

  return message.channel.send(
    new MessageEmbed()
      .setDescription("**Излезнах от гласовият канал:white_check_mark: **")
      .setColor("YELLOW")
  );
};
