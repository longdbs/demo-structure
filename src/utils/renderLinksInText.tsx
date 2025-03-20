export const renderLinksInText = (text: string) => {
  const urlRegex = /(\bhttps?:\/\/[^\s]+|www\.[^\s]+\b)/g;
  return text.split(urlRegex).map((part, index) => {
    if (part.match(urlRegex)) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "blue", textDecoration: "underline" }}
        >
          {part}
        </a>
      );
    }
    return part;
  });
};
