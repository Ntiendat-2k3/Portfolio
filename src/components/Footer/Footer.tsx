import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import styles from "./Footer.module.css";

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.left}>
          <div className={styles.brand}>
            <span className={styles.logoIcon}>D</span>
            <span className={styles.logoText}>Dat</span>
          </div>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=nguyentiendatg2003@gmail.com"
            target="_blank"
            rel="noreferrer"
            className={styles.email}
            style={{ display: "block", textDecoration: "none" }}
          >
            nguyentiendatg2003@gmail.com
          </a>
          <p className={styles.tagline}>Frontend Developer & Web Creator</p>
        </div>

        <div className={styles.right}>
          <h4 className={styles.mediaTitle}>Mạng xã hội</h4>
          <div className={styles.socials}>
            <a
              href="https://github.com/Ntiendat-2k3"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/%C4%91%E1%BA%A1t-nguy%E1%BB%85n-23b142399/"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=nguyentiendatg2003@gmail.com"
              target="_blank"
              rel="noreferrer"
            >
              <FaEnvelope />
            </a>
          </div>
        </div>
      </div>
      <div className={`container ${styles.copy}`}>
        <p>© 2026 Nguyễn Tiến Đạt. All rights reserved.</p>
      </div>
    </footer>
  );
};
