import React from "react";
import { motion } from "framer-motion";
import styles from "./Skills.module.css";

const skillData = [
  {
    title: "Ngôn ngữ",
    items: ["TypeScript", "JavaScript"],
  },
  {
    title: "Framework",
    items: [
      "React",
      "Next.js",
      "Node.js",
      "Express.js",
      "Tailwind CSS",
      "Bootstrap",
    ],
  },
  {
    title: "Cơ sở dữ liệu",
    items: ["PostgreSQL", "MySQL", "Redis"],
  },
  {
    title: "Công cụ",
    items: ["Git", "Figma", "VS Code", "Postman"],
  },
  {
    title: "Khác",
    items: ["HTML", "CSS / SCSS", "RESTful APIs", "Github Actions"],
  },
];

export const Skills: React.FC = () => {
  return (
    <section id="skills">
      <div className="container">
        <h2 className="section-title">
          <span className="hash">#</span>kỹ-năng
        </h2>

        <div className={styles.grid}>
          {skillData.map((block, idx) => (
            <motion.div
              key={block.title}
              className={styles.block}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <div className={styles.blockTitle}>{block.title}</div>
              <div className={styles.divider} />
              <div className={styles.items}>
                {block.items.map((skill) => (
                  <span key={skill} className={styles.tag}>
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
