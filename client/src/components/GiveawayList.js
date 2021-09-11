import { useQuery, gql } from '@apollo/client';

const GIVEAWAY_LIST = gql`
  query GetGiveaways {
    store {
      id
      title
    }
  }
`;

const GiveawayList = () => {
  const { loading, error, data } = useQuery(GIVEAWAY_LIST);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return data.store.map(({ id, title }) => (
    <div key={id}>
      <p>
        {id}: {title}
      </p>
    </div>
  ));
  // return (
  //   <div>
  //     <h2>GiveawayList</h2>
  //   </div>
  // );
};

export default GiveawayList;
