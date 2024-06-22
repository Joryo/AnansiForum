export const highlightWordInText = (text: string, word: string) => {
  const regex = new RegExp(word, "gi");

  return text.replace(
    regex,
    `<span style="background-color: #F9E79F;color:black;padding: 3px;border-radius: 5px"><b>${word}</b></span>`,
  );
};
