export const truncateContent = (content: string, limit: number) => {
  const words = content.split(" ");
  if (words.length > limit) {
    return words.slice(0, limit).join(" ") + "...";
  }
  return content;
};
