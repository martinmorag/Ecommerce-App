'use client'
import Head from 'next/head';
import styles from './style.module.css'


const Welcome = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>My Landing Page</title>
        <meta name="description" content="Welcome to my landing page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="#">My Landing Page!</a>
        </h1>

        <p className={styles.description}>
          Get started by exploring our features and services.
        </p>

        <div className={styles.grid}>
          <a href="#" className={styles.card}>
            <h3>Feature 1 &rarr;</h3>
            <p>Discover our first amazing feature.</p>
          </a>

          <a href="#" className={styles.card}>
            <h3>Feature 2 &rarr;</h3>
            <p>Learn more about our second feature.</p>
          </a>

          <a href="#" className={styles.card}>
            <h3>Feature 3 &rarr;</h3>
            <p>Explore the benefits of our third feature.</p>
          </a>

          <a href="#" className={styles.card}>
            <h3>Contact Us &rarr;</h3>
            <p>Get in touch with our team for more information.</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2024 My Company. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Welcome;
