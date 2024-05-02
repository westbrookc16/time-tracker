import styles from '@/css/footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__copyright}>
        <small className={styles.small}>
          &copy;2024 Chris WestBrook. All rights reserved.
        </small>
      </div>
    </footer>
  );
};

export default Footer;
