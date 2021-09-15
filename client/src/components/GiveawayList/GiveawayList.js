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

  const shortDescription = (description) => {
    return description.length < 250
      ? description
      : description.slice(0, 250) + '...';
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log(styles.gridLayout);

  return (
    <div className={styles.gridLayout}>
      {data.store.map(({ id, title, thumbnail, platforms, description }) => (
        <Link to={`/giveaway/${id}`}>
          <div key={id}>
            <img src={thumbnail} alt={title} className={styles.thumbnail} />
            <p>
              {id}: {title}
            </p>
            <span>{platforms}</span>
            <p>{shortDescription(description)}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default GiveawayList;
