const { paginateResults } = require('./utils');

module.exports = {
  Query: {
    giveaways: async (_, { pageSize = 20, after }, { dataSources }) => {
      const allGiveaways = await dataSources.giveawayAPI.getAllGiveaways();
      const giveaways = paginateResults({
        after,
        pageSize,
        results: allGiveaways,
      });

      console.log(giveaways.map((give) => give.title));
      return {
        giveaways,
        cursor: giveaways.length
          ? giveaways[giveaways.length - 1].cursor
          : null,
        hasMore: giveaways.length
          ? giveaways[giveaways.length - 1].cursor !==
            allGiveaways[allGiveaways.length - 1].cursor
          : false,
      };
    },
    giveaway: async (_, { id }, { dataSources }) => {
      const giveaway = await dataSources.giveawayAPI.getGiveawayById(id);
      return giveaway;
    },
  },
};
