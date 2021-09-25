import styles from './Loading.module.css';

const Loading = () => {
  return <div className={`${styles.textCenter} ${styles.spin}`}>Loading</div>;
};

export default Loading;
