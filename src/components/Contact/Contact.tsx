import React from "react";
import { motion } from "framer-motion";
import styles from "./Contact.module.css";

import githubIcon from "/icons/icon-github-cat.png";
import gmailIcon from "/icons/icon-gmail-cat.png";
import linkedinIcon from "/icons/icon-linkedin-cat.png";
import zaloIcon from "/icons/icon-zalo-cat.png";

export const Contact: React.FC = () => {
  return (
    <section id="contact">
      <div className="container">
        <h2 className="section-title">
          <span className="hash">#</span>liên-hệ
        </h2>

        <div className={styles.layout}>
          <motion.div
            className={styles.text}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p>
              Tôi luôn sẵn sàng đón nhận các cơ hội hợp tác thú vị. Nếu bạn có
              bất kỳ yêu cầu hay câu hỏi nào, đừng ngại liên hệ với tôi nhé!
            </p>
          </motion.div>
          <motion.div
            className={styles.card}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className={styles.cardTitle}>Liên hệ tôi tại đây</h3>
            <div className={styles.contactList}>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=nguyentiendatg2003@gmail.com"
                target="_blank"
                rel="noreferrer"
                className={styles.contactItem}
              >
                <img src={gmailIcon} alt="Gmail icon" className={styles.icon} />
                <span>nguyentiendatg2003@gmail.com</span>
              </a>
              <a
                href="https://github.com/Ntiendat-2k3"
                target="_blank"
                rel="noreferrer"
                className={styles.contactItem}
              >
                <img
                  src={githubIcon}
                  alt="Github icon"
                  className={styles.icon}
                />
                <span>Ntiendat-2k3</span>
              </a>
              <a
                href="https://www.linkedin.com/in/%C4%91%E1%BA%A1t-nguy%E1%BB%85n-23b142399/"
                target="_blank"
                rel="noreferrer"
                className={styles.contactItem}
              >
                <img
                  src={linkedinIcon}
                  alt="Linkedin icon"
                  className={styles.icon}
                />
                <span>Đạt Nguyễn</span>
              </a>
              <a
                href="https://zalo.me/0374322747"
                target="_blank"
                rel="noreferrer"
                className={styles.contactItem}
              >
                <img src={zaloIcon} alt="Zalo icon" className={styles.icon} />
                <span>0374322747</span>
              </a>
            </div>
            <div className={styles.line}></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
