import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaCode } from 'react-icons/fa';
import { BsBoxArrowUpRight } from 'react-icons/bs';
import { fetchRepos, type GitHubRepo } from '../../services/github';
import { LanguageBar } from './LanguageBar';
import { ReadmePreview } from './ReadmePreview';
import { CodeExplorer } from './CodeExplorer';
import styles from './Projects.module.css';

export const Projects = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [explorerRepo, setExplorerRepo] = useState<string | null>(null);

  useEffect(() => {
    fetchRepos(6)
      .then(setRepos)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="projects">
      <div className="container">
        <h2 className="section-title">
          <span className="hash">#</span>dự-án
        </h2>

        {loading ? (
          <div className={styles.loader}>Đang tải dự án từ GitHub...</div>
        ) : repos.length === 0 ? (
          <div className={styles.loader}>
            ⚠️ GitHub API giới hạn tạm thời. Vui lòng tải lại sau vài phút.
          </div>
        ) : (
          <div className={styles.grid}>
            {repos.map((repo, idx) => (
              <motion.div
                key={repo.id}
                className={styles.card}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Tech tags */}
                <div className={styles.techs}>
                  {repo.language && <span>{repo.language}</span>}
                  {repo.topics?.slice(0, 3).map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>

                {/* Card body */}
                <div className={styles.cardBody}>
                  <h3 className={styles.repoName}>{repo.name}</h3>
                  <p className={styles.desc}>
                    {repo.description || 'Không có mô tả.'}
                  </p>

                  {/* Language breakdown bar */}
                  <LanguageBar repoName={repo.name} />

                  {/* README auto-sync preview */}
                  <ReadmePreview repoName={repo.name} />

                  {/* Action buttons */}
                  <div className={styles.links}>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.linkBtn}
                    >
                      Github <FaGithub />
                    </a>
                    {repo.homepage && repo.homepage.trim() !== '' && (
                      <a
                        href={repo.homepage}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.linkBtnSecondary}
                      >
                        Demo <BsBoxArrowUpRight />
                      </a>
                    )}
                    <button
                      className={styles.linkBtnCode}
                      onClick={() => setExplorerRepo(repo.name)}
                    >
                      <FaCode /> Xem Code
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Code Explorer Modal */}
      {explorerRepo && (
        <CodeExplorer
          repoName={explorerRepo}
          isOpen={!!explorerRepo}
          onClose={() => setExplorerRepo(null)}
        />
      )}
    </section>
  );
};
