import { useTheme } from '../../context/ThemeContext';
import { FiSun, FiMoon, FiMonitor } from 'react-icons/fi';
import styles from './ThemeToggle.module.css';

const modes = [
  { value: 'light' as const, icon: FiSun, label: 'Sáng' },
  { value: 'dark' as const, icon: FiMoon, label: 'Tối' },
  { value: 'system' as const, icon: FiMonitor, label: 'Hệ thống' },
];

export const ThemeToggle = () => {
  const { mode, setMode } = useTheme();

  return (
    <div className={styles.toggle}>
      {modes.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          className={`${styles.btn} ${mode === value ? styles.active : ''}`}
          onClick={() => setMode(value)}
          title={label}
          aria-label={label}
        >
          <Icon size={14} />
        </button>
      ))}
    </div>
  );
};
