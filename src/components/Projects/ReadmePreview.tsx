import { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { fetchReadme } from "../../services/github";
import styles from "./Projects.module.css";

interface Props {
  repoName: string;
}

export const ReadmePreview = ({ repoName }: Props) => {
  const [readme, setReadme] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpen = async () => {
    setIsOpen(true);
    if (readme) return;
    setLoading(true);
    const content = await fetchReadme(repoName);
    setReadme(content);
    setLoading(false);
  };

  return (
    <>
      {/* Small button in card */}
      <button className={styles.readmeBtn} onClick={handleOpen}>
        📝 Mô tả dự án
      </button>

      {/* Modal portal — renders at document.body, always centered in viewport */}
      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className={styles.readmeOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            >
              <motion.div
                className={styles.readmeModal}
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className={styles.readmeModalHeader}>
                  <div className={styles.readmeModalTitle}>
                    <span>📝</span>
                    <span>{repoName}/README.md</span>
                  </div>
                  <button
                    className={styles.readmeModalClose}
                    onClick={() => setIsOpen(false)}
                  >
                    ✕
                  </button>
                </div>

                {/* Content */}
                <div className={styles.readmeModalBody}>
                  {loading ? (
                    <div className={styles.readmeLoading}>
                      Đang tải README...
                    </div>
                  ) : readme ? (
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {readme}
                    </ReactMarkdown>
                  ) : (
                    <div className={styles.readmeLoading}>
                      Repo này chưa có README.md
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
};
