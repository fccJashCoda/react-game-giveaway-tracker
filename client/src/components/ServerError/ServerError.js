import styles from './ServerError.module.css';

const ServerError = ({ message }) => {
  return (
    <div className={styles.textCenter}>
      <h3 className={styles.errorNumber}>500</h3>
      <h4 className={styles.errorMessage}>{message}</h4>
    </div>
  );
};

export default ServerError;
