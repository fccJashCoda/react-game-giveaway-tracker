import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import styles from './Giveaway.module.css';

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {id}</p>;

  const {
    title,
    thumbnail,
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

  return (
    <div className={styles.giveaway}>
      <img src={thumbnail} alt={title} />
      {/* <img src={image} alt={title} /> */}
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
        <p>{platforms}</p>
        <div className='dateGroup'>
          <p>Start date: {published_date}</p>
          <p>End date: {end_date}</p>
        </div>
        <span>{status}</span>
        <span>{type}</span>
        <p>{instructions}</p>
        <a href={open_giveaway}>Open Giveaway</a>
      </div>
    </div>
  );
};

export default Giveaway;
