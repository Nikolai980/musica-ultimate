const { MessageEmbed } = require("discord.js");

exports.run = async (client, message) => {
  const channel = message.member.voice.channel;
  if (!channel)
    return message.channel.send(
      "Трябва да сте влезли във гласов канал за да можете да използвате тази команда!"
    );

  if (!channel.permissionsFor(message.client.user).has("CONNECT"))
    return error("Нямам право да влезна във гласовият канал");

  if (!channel.permissionsFor(message.client.user).has("SPEAK"))
    return error("Лошо нямам право да говоря във този гласов канал");

  await channel.join();

  return message.channel.send(
    new MessageEmbed()
      .setDescription("**Влезнах във гласовият канал :white_check_mark: **")
      .setColor("YELLOW")
  );
};
