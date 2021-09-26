module.exports = {
  Query: {
    giveaways: async (_, __, { dataSources }) => {
      const allGiveaways = await dataSources.giveawayAPI.getAllGiveaways();
      return allGiveaways;
    },
    giveaway: async (_, { id }, { dataSources }) => {
      const giveaway = await dataSources.giveawayAPI.getGiveawayById(id);
      return giveaway;
    },
  },
};
