const friendlyCategories = require('../../assets/json/friendly_categories.json');
const { JUGE_REPO_USERNAME, JUGE_REPO_NAME } = process.env;

module.exports = {
  name: 'help',
  aliases: ['h'],
  description: 'Shows details about a category or command',
  usage: '<category|command>',
  category: 'bot',
  requirements: { botPermissions: ['EMBED_LINKS', 'USE_EXTERNAL_EMOJIS'] },
  execute(client, message) {
    let [ parameter ] = message.parameters;
    const prefixUsed = message.content.replace(/(help|h).*/g, '');

    if (parameter) {
      parameter = parameter.toLowerCase();

      const categories = client.utils.uniqueItems(client.commands.filter(({ category }) => category !== 'developer').map(({ category }) => category));

      if (!client.commands.has(parameter) && !categories.includes(parameter)) parameter = client.commands.filter(({ aliases }) => aliases.includes(parameter)).map(({ name }) => name)[0];
      if (client.commands.has(parameter)) {
        const {
          name,
          aliases,
          description,
          usage
        } = client.commands.get(parameter);

        const embed = new client.MessageEmbed()
          .setColor(client.utils.hexColor(message))
          .setTitle(`:mag: ${name}`)
          .setDescription(description)
          .addField(':page_facing_up: Usage', client.utils.sendCode(`${prefixUsed}${name}${usage ? ` ${usage}` : ''}`, { code: 'fix' }))

          if (aliases.length) embed.addField(':paperclip: Aliases', client.utils.sendCode(aliases.join(' '), { code: 'fix' }));
        message.channel.send(embed);
      } else if (categories.includes(parameter)) {
          const commands = client.commands.filter(({ category }) => category === parameter);
          const category = friendlyCategories[commands.map(({ category }) => category)[0]];

          message.channel.send(new client.MessageEmbed()
            .setColor(client.utils.hexColor(message))
            .addField(`${category.icon} ${category.name}`, client.utils.chunkArray(commands.map(({ name }) => name), { chunks: 3 }).map((items) => `\`${items.map((name) => client.utils.leading(name, { side: 'right', width: 15, character: ' ' })).join('')}\``).join('\n'))
          );
      }
    } else {
      message.channel.send(new client.MessageEmbed()
        .setColor(client.utils.hexColor(message))
        .setTitle(`${resolveEmoji('669895916299485211')} ${client.user.username}'s Help`)
        .setDescription(`*Use \`${prefixUsed}help <category/command>\` for more info about!*`)
        .addField('\u200B', [
          `${resolveEmoji('563403841924497419')} [GitHub Repository](https://github.com/${JUGE_REPO_USERNAME}/${JUGE_REPO_NAME})`
        ].join(' '))
      );
    }

    function resolveEmoji(_id) {
      const { id, name } = client.emojis.cache.get(_id);
      return `<:${name}:${id}>`;
    }
  }
};
