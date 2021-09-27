import { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import styles from './GiveawayList.module.css';

import { Link } from 'react-router-dom';
import PlatformPills from '../PlatformPills/PlatformPills';
import Loading from '../Loading/Loading';
import ServerError from '../ServerError/ServerError';

const GIVEAWAY_LIST = gql`
  query GetGiveaways($after: String) {
    giveaways(after: $after) {
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

  console.log(data.giveaways.cursor);

  return (
    <div className={styles.gridLayout}>
      {data.giveaways &&
        data.giveaways.giveaways &&
        data.giveaways.giveaways.map(
          ({ id, title, thumbnail, platforms, description }) => (
            <Link key={id} to={`/giveaway/${id}`}>
              <div className={styles.gameGiveaway}>
                <img src={thumbnail} alt={title} className={styles.thumbnail} />
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
      {data.giveaways &&
        data.giveaways.hasMore &&
        (isLoadingMore ? (
          <Loading />
        ) : (
          <button
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
    </div>
  );
};

export default GiveawayList;
