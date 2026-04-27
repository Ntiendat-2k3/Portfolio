import { useState, useEffect, useCallback } from 'react';

const phrases = [
  'Frontend Developer',
  'React Enthusiast',
  'UI/UX Lover',
  'Web Creator',
];

interface TypingEffectResult {
  displayText: string;
  isDeleting: boolean;
}

export const useTypingEffect = (
  customPhrases?: string[],
  typingSpeed = 100,
  deletingSpeed = 60,
  pauseDuration = 2000
): TypingEffectResult => {
  const items = customPhrases || phrases;
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const tick = useCallback(() => {
    const currentPhrase = items[phraseIndex];

    if (isPaused) return;

    if (!isDeleting) {
      // Typing
      if (charIndex < currentPhrase.length) {
        setCharIndex(prev => prev + 1);
      } else {
        setIsPaused(true);
        setTimeout(() => {
          setIsPaused(false);
          setIsDeleting(true);
        }, pauseDuration);
      }
    } else {
      // Deleting
      if (charIndex > 0) {
        setCharIndex(prev => prev - 1);
      } else {
        setIsDeleting(false);
        setPhraseIndex(prev => (prev + 1) % items.length);
      }
    }
  }, [charIndex, isDeleting, isPaused, phraseIndex, items, pauseDuration]);

  useEffect(() => {
    if (isPaused) return;
    const speed = isDeleting ? deletingSpeed : typingSpeed;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting, isPaused, typingSpeed, deletingSpeed]);

  return {
    displayText: items[phraseIndex].substring(0, charIndex),
    isDeleting,
  };
};
