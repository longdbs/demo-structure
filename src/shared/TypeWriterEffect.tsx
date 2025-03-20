import React, { useEffect, useState } from "react";
import { renderLinksInText } from "../utils/renderLinksInText";

interface TypeWriterEffectProps {
  text: string;
  speed?: number;
  onPopoverOpen: (event: React.MouseEvent<HTMLElement>, link: string) => void;
  onScroll: () => void;
}

const TypeWriterEffect: React.FC<TypeWriterEffectProps> = ({
  text,
  speed = 10,
  onPopoverOpen,
  onScroll,
}) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      if (index < text.length) {
        const currentChar = text[index];
        if (currentChar !== undefined && currentChar !== null) {
          setDisplayedText((prev) => prev + currentChar);
          onScroll();
        }
        index += 1;
      } else {
        clearInterval(intervalId);
      }
    }, speed);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, speed]);

  return <span>{renderLinksInText(displayedText, onPopoverOpen)}</span>;
};

export default TypeWriterEffect;
