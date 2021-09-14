import { useQuery, gql } from '@apollo/client';
import styles from './GiveawayList.module.css';

import { Link } from 'react-router-dom';

const GIVEAWAY_LIST = gql`
  query GetGiveaways {
    store {
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.gridLayout}>
      {data.store.map(({ id, title, thumbnail, platforms, description }) => (
        <div key={id}>
          <img src={thumbnail} alt={title} className={styles.thumbnail} />
          <p>
            {id}: {title}
          </p>
          <span>{platforms}</span>
          <p>{description}</p>
          <Link to={`/giveaway/${id}`}>Go to</Link>
        </div>
      ))}
    </div>
  );
};

export default GiveawayList;
