import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypingTextProps {
  text: string;
  speed?: number; // milliseconds per character
  className?: string;
  onComplete?: () => void;
  delay?: number; // delay before starting animation
}

const TypingText: React.FC<TypingTextProps> = ({
  text,
  speed = 50,
  className = "",
  onComplete,
  delay = 0
}) => {
  const [displayedText, setDisplayedText] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (text.length === 0) return;

    // Reset when text changes
    setDisplayedText('');
    setCurrentIndex(0);
    setIsTyping(false);

    const startTyping = () => {
      setIsTyping(true);
      
      const timer = setInterval(() => {
        setCurrentIndex(prevIndex => {
          const nextIndex = prevIndex + 1;
          
          if (nextIndex <= text.length) {
            setDisplayedText(text.slice(0, nextIndex));
            return nextIndex;
          } else {
            clearInterval(timer);
            setIsTyping(false);
            onComplete?.();
            return prevIndex;
          }
        });
      }, speed);

      return () => clearInterval(timer);
    };

    const timeoutId = setTimeout(startTyping, delay);
    return () => clearTimeout(timeoutId);
  }, [text, speed, delay, onComplete]);

  return (
    <span className={`inline-block ${className}`} style={{ fontFamily: 'Google Sans Code, monospace' }}>
      {displayedText}
      {isTyping && (
        <motion.span
          className="inline-block w-[0.4em] h-[1em] bg-white ml-0.5"
          animate={{ opacity: [1, 0, 1] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
    </span>
  );
};

export default TypingText;
