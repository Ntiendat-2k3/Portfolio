import React from "react";
import { motion } from "framer-motion";
import { useTypingEffect } from "../../hooks/useTypingEffect";
import { Parallax } from "../Parallax/Parallax";
import styles from "./Hero.module.css";

interface Props {
  onOpenTerminal: () => void;
}

export const Hero: React.FC<Props> = ({ onOpenTerminal }) => {
  const { displayText } = useTypingEffect([
    "Frontend Developer",
    "React Enthusiast",
    "UI/UX Lover",
    "Web Creator",
  ]);

  return (
    <section id="hero" className={styles.hero}>
      <div className={`container ${styles.inner}`}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className={styles.title}>
            Xin chào, tôi là{" "}
            <span className={styles.name}>Nguyễn Tiến Đạt</span> 👋
          </h1>

          <div className={styles.typingWrapper}>
            <span className={styles.typingText}>{displayText}</span>
            <span className={styles.cursor}>|</span>
          </div>

          <p className={styles.subtitle}>
            Tôi là một{" "}
            <span className={styles.highlight}>Frontend Developer</span> chuyên
            xây dựng giao diện web hiện đại, responsive và trải nghiệm người
            dùng mượt mà.
          </p>
          <div className={styles.actions}>
            <a href="#contact" className={styles.btnPrimary}>
              Liên hệ tôi !!
            </a>
            <a
              href="https://drive.google.com/uc?export=download&id=1mknhTAZkw1kPN13K0hLiTrWYt_wK4kI2"
              className={styles.btnDownload}
              target="_blank"
              rel="noopener noreferrer"
            >
              📄 Tải CV
            </a>
            <button className={styles.btnSecondary} onClick={onOpenTerminal}>
              Terminal ⌘K
            </button>
          </div>
        </motion.div>

        {/* Parallax 3D character */}
        <Parallax speed={0.15}>
          <motion.div
            className={styles.imageWrapper}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className={styles.avatar}>
              <img
                src="/images/hero-bg.png"
                alt="3D Avatar giơ tay chào"
                className={styles.bgImage}
              />
            </div>
            <div className={styles.statusBox}>
              <div className={styles.statusDot} />
              <span>Đang tìm kiếm cơ hội mới</span>
            </div>
          </motion.div>
        </Parallax>
      </div>

      <Parallax speed={0.08}>
        <motion.div
          className={styles.quoteBox}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className={styles.quote}>
            <p>"Code là nghệ thuật biến ý tưởng thành hiện thực"</p>
          </div>
          <span className={styles.quoteAuthor}>- Nguyễn Tiến Đạt</span>
        </motion.div>
      </Parallax>
    </section>
  );
};
