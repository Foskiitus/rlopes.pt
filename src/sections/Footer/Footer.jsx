import styles from "./Footer.module.css";

function Footer() {
  return (
    <section id="footer" className={styles.container}>
      <p>
        &copy; 2024 RLopes.
        <br /> All rights Reserved
      </p>
    </section>
  );
}

export default Footer;
