import React, { useState } from 'react';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';
import styles from './Header.module.css';

const navLinks = [
  { label: 'trang-chủ', href: '#hero' },
  { label: 'dự-án', href: '#projects' },
  { label: 'về-tôi', href: '#about' },
  { label: 'liên-hệ', href: '#contact' },
];

interface Props {
  onOpenTerminal: () => void;
}

export const Header: React.FC<Props> = ({ onOpenTerminal }) => {
  const [active, setActive] = useState('trang-chủ');
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <a href="#hero" className={styles.logo}>
          <span className={styles.logoIcon}>D</span>
          <span className={styles.logoText}>Dat</span>
        </a>

        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
          {navLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              className={`${styles.navLink} ${active === link.label ? styles.active : ''}`}
              onClick={() => { setActive(link.label); setMenuOpen(false); }}
            >
              <span className={styles.hash}>#</span>
              {link.label}
            </a>
          ))}
          <ThemeToggle />
          <button className={styles.terminalBtn} onClick={() => { onOpenTerminal(); setMenuOpen(false); }}>
            ⌘K
          </button>
        </nav>

        <div className={styles.mobileActions}>
          <ThemeToggle />
          <button className={styles.burger} onClick={() => setMenuOpen(!menuOpen)}>
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
};
