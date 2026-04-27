import { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/Header/Header';
import { Hero } from './components/Hero/Hero';
import { Projects } from './components/Projects/Projects';
import { Skills } from './components/Skills/Skills';
import { About } from './components/About/About';
import { Contact } from './components/Contact/Contact';
import { Footer } from './components/Footer/Footer';
import { CommandPalette } from './components/CommandPalette/CommandPalette';
import { PeekingCat } from './components/PeekingCat/PeekingCat';

function App() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsTerminalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <ThemeProvider>
      {/* Vertical glowing line */}
      <div className="vertical-line" aria-hidden="true" />

      <Header onOpenTerminal={() => setIsTerminalOpen(true)} />
      <main>
        <Hero onOpenTerminal={() => setIsTerminalOpen(true)} />
        <Projects />
        <Skills />
        <About />
        <Contact />
      </main>
      <Footer />

      {/* Interactive peeking cat */}
      <PeekingCat />

      <CommandPalette
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />
    </ThemeProvider>
  );
}

export default App;
