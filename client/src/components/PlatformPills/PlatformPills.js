import styles from './PlatformPills.module.css';

const PlatformPills = ({ platforms }) => {
  let platformList = platforms.split(', ');

  return (
    <div>
      {platformList.map((platform) => {
        const impact = platform.split(' ').join('-').toLowerCase();
        console.log(impact);
        return (
          <span key={platform} className={`${styles.pill} ${styles[impact]}`}>
            {platform}
          </span>
        );
      })}
    </div>
  );
};

export default PlatformPills;
