import styles from './PlatformPills.module.css';

const PlatformPills = ({ platforms }) => {
  let platformList = platforms.split(', ');

  return (
    <div>
      {platformList.map((platform) => {
        const platformName = platform.split(' ').join('-').toLowerCase();
        return (
          <span
            key={platform}
            className={`${styles.pill} ${styles[platformName]}`}
          >
            {platform}
          </span>
        );
      })}
    </div>
  );
};

export default PlatformPills;
