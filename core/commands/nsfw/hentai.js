const { RandomNekoBotImage } = require('../../');

module.exports = {
  name: 'hentai',
  aliases: [],
  description: 'Perverted photos',
  category: 'nsfw',
  requirements: { nsfwOnly: true, botPermissions: ['EMBED_LINKS'] },
  async execute(client, message) {
    await RandomNekoBotImage(client, message, this);
  }
};
