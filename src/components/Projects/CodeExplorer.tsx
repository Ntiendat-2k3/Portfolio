import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import {
  fetchFileTree,
  fetchFileContent,
  type FileTreeItem,
} from '../../services/github';
import styles from './Projects.module.css';

interface Props {
  repoName: string;
  isOpen: boolean;
  onClose: () => void;
}

// Map file extension → syntax language
function getLanguage(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase() || '';
  const map: Record<string, string> = {
    ts: 'typescript',
    tsx: 'tsx',
    js: 'javascript',
    jsx: 'jsx',
    css: 'css',
    scss: 'scss',
    html: 'html',
    json: 'json',
    md: 'markdown',
    py: 'python',
    java: 'java',
    yml: 'yaml',
    yaml: 'yaml',
    sh: 'bash',
    sql: 'sql',
    dockerfile: 'docker',
    gitignore: 'git',
    env: 'bash',
  };
  return map[ext] || 'text';
}

// File icon
function getFileIcon(name: string, isDir: boolean): string {
  if (isDir) return '📁';
  const ext = name.split('.').pop()?.toLowerCase() || '';
  const icons: Record<string, string> = {
    ts: '🔷', tsx: '⚛️', js: '🟡', jsx: '⚛️',
    css: '🎨', scss: '🎨', html: '🌐',
    json: '📋', md: '📝', py: '🐍',
    png: '🖼️', jpg: '🖼️', svg: '🖼️',
    gitignore: '🙈', env: '🔒',
  };
  return icons[ext] || '📄';
}

export const CodeExplorer = ({ repoName, isOpen, onClose }: Props) => {
  const [tree, setTree] = useState<FileTreeItem[]>([]);
  const [path, setPath] = useState('');
  const [pathStack, setPathStack] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState('');
  const [loadingFile, setLoadingFile] = useState(false);
  const [loadingTree, setLoadingTree] = useState(false);

  const loadTree = useCallback(
    async (p: string) => {
      setLoadingTree(true);
      const items = await fetchFileTree(repoName, p);
      // Sort: dirs first, then files
      items.sort((a, b) => {
        if (a.type !== b.type) return a.type === 'dir' ? -1 : 1;
        return a.name.localeCompare(b.name);
      });
      setTree(items);
      setPath(p);
      setLoadingTree(false);
    },
    [repoName]
  );

  useEffect(() => {
    if (isOpen) {
      loadTree('');
      setPathStack([]);
      setSelectedFile(null);
      setFileContent('');
    }
  }, [isOpen, loadTree]);

  const handleItemClick = async (item: FileTreeItem) => {
    if (item.type === 'dir') {
      setPathStack((prev) => [...prev, path]);
      loadTree(item.path);
      setSelectedFile(null);
      setFileContent('');
    } else if (item.download_url) {
      setLoadingFile(true);
      setSelectedFile(item.name);
      try {
        const content = await fetchFileContent(item.download_url);
        setFileContent(content);
      } catch {
        setFileContent('// Không thể tải file này');
      }
      setLoadingFile(false);
    }
  };

  const handleGoBack = () => {
    const prev = pathStack.pop();
    setPathStack([...pathStack]);
    loadTree(prev || '');
    setSelectedFile(null);
    setFileContent('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.explorerOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={styles.explorerModal}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Title bar */}
            <div className={styles.explorerHeader}>
              <div className={styles.explorerDots}>
                <span className={styles.dotRed} />
                <span className={styles.dotYellow} />
                <span className={styles.dotGreen} />
              </div>
              <span className={styles.explorerTitle}>
                {repoName}/{path || ''}
              </span>
              <button className={styles.explorerClose} onClick={onClose}>
                ✕
              </button>
            </div>

            <div className={styles.explorerBody}>
              {/* File tree sidebar */}
              <div className={styles.fileTree}>
                {path && (
                  <button className={styles.treeBack} onClick={handleGoBack}>
                    ← ..
                  </button>
                )}
                {loadingTree ? (
                  <div className={styles.treeLoading}>Loading...</div>
                ) : (
                  tree.map((item) => (
                    <button
                      key={item.path}
                      className={`${styles.treeItem} ${
                        selectedFile === item.name ? styles.treeItemActive : ''
                      }`}
                      onClick={() => handleItemClick(item)}
                    >
                      <span className={styles.treeIcon}>
                        {getFileIcon(item.name, item.type === 'dir')}
                      </span>
                      <span className={styles.treeName}>{item.name}</span>
                      {item.type === 'dir' && (
                        <span className={styles.treeChevron}>›</span>
                      )}
                    </button>
                  ))
                )}
              </div>

              {/* Code viewer */}
              <div className={styles.codeViewer}>
                {loadingFile ? (
                  <div className={styles.codeLoading}>Đang tải code...</div>
                ) : selectedFile ? (
                  <SyntaxHighlighter
                    language={getLanguage(selectedFile)}
                    style={oneDark}
                    showLineNumbers
                    customStyle={{
                      margin: 0,
                      borderRadius: 0,
                      fontSize: '0.8rem',
                      height: '100%',
                      background: 'transparent',
                    }}
                    wrapLines
                  >
                    {fileContent}
                  </SyntaxHighlighter>
                ) : (
                  <div className={styles.codePlaceholder}>
                    <span>👈</span>
                    <p>Chọn file để xem code</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
