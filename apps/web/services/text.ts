// @ts-ignore
import * as sanitizeHtml from "sanitize-html";

/**
 * Highlights search terms in text, return sanitized html content for display html content in react component with
 * dangerouslySetInnerHTML attribute
 * @param text - text to highlight
 * @param highlights - search terms to highlight
 * @param maxContentLength - maximum length of the content to display
 */
export const highlightsSearchesTerms = (
  text: string,
  highlights: string[],
  maxContentLength: number,
) => {
  const replacement =
    "<span style='background-color: #F9E79F;color:black;padding: 3px;border-radius: 5px'>$&</span>";
  let updatedContent = sanitizeHtml(text);
  let updatedMaxLength = maxContentLength;
  let firstMatchIndex = 0;

  highlights.forEach((word) => {
    const regex = new RegExp(word, "gi");
    const numberOfMatches = (text.match(regex) || []).length;

    if (text.search(regex) > firstMatchIndex) {
      firstMatchIndex = text.search(regex);
    }

    if (numberOfMatches > 0) {
      // Update the max length to include the length of the replacement html tag
      updatedMaxLength =
        updatedMaxLength + numberOfMatches * replacement.length;
      updatedContent = text.replace(regex, replacement);
    }
  });

  // Keep at least the first match if text needs to be truncated
  if (updatedContent.length > updatedMaxLength) {
    updatedContent =
      "..." + updatedContent.slice(firstMatchIndex, updatedMaxLength) + "...";
  }

  return updatedContent;
};
