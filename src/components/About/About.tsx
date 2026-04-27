import React from 'react';
import { motion } from 'framer-motion';
import { Parallax } from '../Parallax/Parallax';
import styles from './About.module.css';

export const About: React.FC = () => {
  return (
    <section id="about">
      <div className="container">
        <h2 className="section-title">
          <span className="hash">#</span>về-tôi
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
              Xin chào, tôi là <strong>Nguyễn Tiến Đạt</strong>!
            </p>
            <p>
              Tôi là sinh viên ngành Công nghệ Thông tin, đam mê xây dựng các ứng dụng web
              từ ý tưởng đến sản phẩm hoàn chỉnh. Tôi có kinh nghiệm với cả Frontend lẫn
              Backend và luôn nỗ lực tìm hiểu các công nghệ mới nhất.
            </p>
            <p>
              Sáng tạo và biến ý tưởng thành code là niềm đam mê lớn nhất của tôi. 
              Tôi thích giải quyết các bài toán phức tạp và tạo ra những trải nghiệm 
              người dùng tuyệt vời.
            </p>
            <a href="#contact" className={styles.readMore}>
              Đọc thêm →
            </a>
          </motion.div>

          <Parallax speed={0.2}>
            <motion.div
              className={styles.visual}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className={styles.decorBox}>
                <div className={styles.dots}>
                  {Array.from({ length: 25 }).map((_, i) => (
                    <span key={i} className={styles.dot} />
                  ))}
                </div>
                <div className={styles.accentRect} />
              </div>
            </motion.div>
          </Parallax>
        </div>
      </div>
    </section>
  );
};
