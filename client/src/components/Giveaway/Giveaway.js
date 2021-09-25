import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import styles from './Giveaway.module.css';

import Loading from '../Loading/Loading';
import ServerError from '../ServerError/ServerError';
import PlatformPills from '../PlatformPills/PlatformPills';

const Giveaway = () => {
  const { id } = useParams();
  const GIVEAWAY = gql`
    query GetGiveaways {
      getGiveaway(id:${id}) {
        title
        thumbnail
        platforms
        description
        image
        type
        status
        instructions
        published_date
        end_date
        open_giveaway
      }
    }
  `;
  const { loading, error, data } = useQuery(GIVEAWAY);

  if (loading) return <Loading />;
  if (error) return <ServerError message={error.message} />;

  const {
    title,
    platforms,
    description,
    image,
    type,
    status,
    instructions,
    published_date,
    end_date,
    open_giveaway,
  } = data.getGiveaway;

  const isntructionList = instructions.split('\r\n');

  return (
    <div className={styles.giveaway}>
      <Loading />
      <img src={image} alt={title} />
      <div>
        <h2>{title}</h2>
        <PlatformPills platforms={platforms} />
        <p>{description}</p>
        <div className='dateGroup'>
          <p>Start date: {published_date}</p>
          <p>End date: {end_date}</p>
        </div>
        <span>Status: {status}</span>
        <span>Type: {type}</span>
        <ul>
          {isntructionList.map((instruction, i) => (
            <li key={i}>{instruction}</li>
          ))}
        </ul>
        <a href={open_giveaway}>Open Giveaway</a>
      </div>
    </div>
  );
};

export default Giveaway;
