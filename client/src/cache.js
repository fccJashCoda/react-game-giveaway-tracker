import { InMemoryCache } from '@apollo/client';

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        giveaways: {
          keyArgs: false,
          merge(existing, incoming) {
            let giveaways = [];
            if (existing && existing.giveaways) {
              giveaways = giveaways.concat(existing.giveaways);
            }
            if (incoming && incoming.giveaways) {
              giveaways = giveaways.concat(incoming.giveaways);
            }

            return {
              ...incoming,
              giveaways,
            };
          },
        },
      },
    },
  },
});
