import React, { useEffect, useState } from "react";

interface TypeWriterEffectProps {
  text: string;
  speed?: number;
}

const TypeWriterEffect: React.FC<TypeWriterEffectProps> = ({
  text,
  speed = 10,
}) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      if (index < text.length) {
        const currentChar = text[index];
        if (currentChar !== undefined && currentChar !== null) {
          setDisplayedText((prev) => prev + currentChar);
        }
        index += 1;
      } else {
        clearInterval(intervalId);
      }
    }, speed);

    return () => clearInterval(intervalId);
  }, [text, speed]);

  return <span>{displayedText}</span>;
};

export default TypeWriterEffect;
