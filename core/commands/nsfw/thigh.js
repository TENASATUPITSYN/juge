const { RandomNekoBotImage } = require('../../');

module.exports = {
  name: 'thigh',
  aliases: [],
  description: 'Thigh images',
  category: 'nsfw',
  requirements: { nsfwOnly: true, botPermissions: ['EMBED_LINKS'] },
  async execute(client, message) {
    await RandomNekoBotImage(client, message, this);
  }
};
