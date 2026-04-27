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
          <p className={styles.email}>nguyentiendatg2003@gmail.com</p>
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
              href="https://linkedin.com/in/nguyentiendat"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin />
            </a>
            <a href="mailto:nguyentiendatg2003@gmail.com">
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
