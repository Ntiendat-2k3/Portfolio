import { useState } from "react";
import styles from "./PeekingCat.module.css";

export const PeekingCat = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`${styles.catWrapper} ${isHovered ? styles.peeked : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src="/icons/icon-cat-moveInOut.png"
        alt="Mèo thò ra"
        className={styles.catImage}
        draggable={false}
      />
      <div className={styles.tooltip}>Meow! 🐱</div>
    </div>
  );
};
