const { RandomBooruPost } = require('../../');

module.exports = {
  name: 'paheal',
  aliases: ['pa'],
  description: 'Searches for images on rule34.paheal.net',
  usage: '[search query]',
  category: 'nsfw',
  requirements: { nsfwOnly: true, parameters: true, botPermissions: ['EMBED_LINKS'] },
  cooldown: 10,
  async execute(client, message) {
    await RandomBooruPost(client, message, this);
  }
};
