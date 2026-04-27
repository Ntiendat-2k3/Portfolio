import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchEvents, formatEventMessage, type GitHubEvent } from '../../services/github';
import styles from './Projects.module.css';

export const GitHubActivity = () => {
  const [events, setEvents] = useState<GitHubEvent[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    fetchEvents(8).then(setEvents).catch(console.error);
  }, []);

  // Auto-rotate events
  useEffect(() => {
    if (events.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % events.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [events.length]);

  if (events.length === 0) return null;

  const msg = formatEventMessage(events[current]);

  return (
    <div className={styles.activityBar}>
      <div className={styles.activityDot} />
      <AnimatePresence mode="wait">
        <motion.span
          key={current}
          className={styles.activityText}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          dangerouslySetInnerHTML={{
            __html: msg.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
          }}
        />
      </AnimatePresence>
    </div>
  );
};
