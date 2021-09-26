import { useQuery, gql } from '@apollo/client';
import styles from './GiveawayList.module.css';

import { Link } from 'react-router-dom';
import PlatformPills from '../PlatformPills/PlatformPills';
import Loading from '../Loading/Loading';
import ServerError from '../ServerError/ServerError';

const GIVEAWAY_LIST = gql`
  query GetGiveaways {
    giveaways {
      id
      title
      thumbnail
      platforms
      description
    }
  }
`;

const GiveawayList = () => {
  const { loading, error, data } = useQuery(GIVEAWAY_LIST);

  const shortDescription = (description) => {
    return description.length < 250
      ? description
      : description.slice(0, 250) + '...';
  };

  if (loading) return <Loading />;
  if (error) return <ServerError message={error.message} />;

  return (
    <div className={styles.gridLayout}>
      {data.giveaways.map(
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
    </div>
  );
};

export default GiveawayList;
