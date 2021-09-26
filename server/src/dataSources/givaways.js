const { RESTDataSource } = require('apollo-datasource-rest');

class GiveawayApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:7555';
  }

  async getAllGiveaways() {
    const response = await this.get('');
    return Array.isArray(response.store)
      ? response.store.map((giveaway) => this.giveawayReducer(giveaway))
      : [];
  }

  giveawayReducer(giveaway) {
    return {
      id: giveaway.id || 0,
      title: giveaway.title,
      description: giveaway.description,
      platforms: giveaway.platforms,
      thumbnail: giveaway.thumbnail,
      image: giveaway.image,
      type: giveaway.type,
      status: giveaway.status,
      instructions: giveaway.instructions,
      published_date: giveaway.published_date,
      end_date: giveaway.end_date,
      open_giveaway: giveaway.open_giveaway,
    };
  }

  async getGiveawayById(id) {
    const allGiveaways = await this.getAllGiveaways();
    const giveaway = allGiveaways.find((el) => el.id === +id);
    return giveaway;
  }
}

module.exports = GiveawayApi;
