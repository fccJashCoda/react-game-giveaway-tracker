import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

const Giveaway = () => {
  const { id } = useParams();
  const GIVEAWAY = gql`
    query GetGiveaways {
      getGiveaway(id:${id}) {
        title
        thumbnail
        platforms
        description
      }
    }
  `;
  const { loading, error, data } = useQuery(GIVEAWAY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {id}</p>;

  console.log(data);
  return <h2>{data.getGiveaway.title}</h2>;
};

export default Giveaway;
