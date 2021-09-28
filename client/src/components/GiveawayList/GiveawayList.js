import { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import styles from './GiveawayList.module.css';

import { Link } from 'react-router-dom';
import PlatformPills from '../PlatformPills/PlatformPills';
import Loading from '../Loading/Loading';
import ServerError from '../ServerError/ServerError';

const GIVEAWAY_LIST = gql`
  query GetGiveaways($pageSize: Int, $after: String) {
    giveaways(pageSize: $pageSize, after: $after) {
      cursor
      hasMore
      giveaways {
        id
        title
        thumbnail
        platforms
        description
      }
    }
  }
`;

const GiveawayList = () => {
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const { loading, error, data, fetchMore } = useQuery(GIVEAWAY_LIST);

  const shortDescription = (description) => {
    return description.length < 250
      ? description
      : description.slice(0, 250) + '...';
  };

  if (loading) return <Loading />;
  if (error) return <ServerError message={error.message} />;
  if (!data) return <p>Not Found</p>;

  return (
    <main className={styles.mainCol}>
      <div className={styles.gridLayout}>
        {data.giveaways &&
          data.giveaways.giveaways &&
          data.giveaways.giveaways.map(
            ({ id, title, thumbnail, platforms, description }) => (
              <Link key={id} to={`/giveaway/${id}`}>
                <div className={styles.gameGiveaway}>
                  <img
                    src={thumbnail}
                    alt={title}
                    className={styles.thumbnail}
                  />
                  <div className={styles.gameInfo}>
                    <h2>
                      {id}: {title}
                    </h2>
                    <PlatformPills platforms={platforms} />
                    <p>{shortDescription(description)}</p>
                  </div>
                </div>
              </Link>
            )
          )}
      </div>
      {data.giveaways &&
        data.giveaways.hasMore &&
        (isLoadingMore ? (
          <Loading />
        ) : (
          <button
            className={styles.loadMore}
            onClick={async () => {
              setIsLoadingMore(true);
              await fetchMore({
                variables: {
                  after: data.giveaways.cursor,
                },
              }).then(() => setIsLoadingMore(false));
            }}
          >
            Load more
          </button>
        ))}
    </main>
  );
};

export default GiveawayList;
