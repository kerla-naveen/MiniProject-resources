/**
 * Creates a URL path from a given page name.
 * @param {string} pageName - The name of the page (e.g., "NoticeBoard").
 * @returns {string} The formatted URL path (e.g., "/notice-board").
 */
export function createPageUrl(pageName) {
  if (!pageName) {
    return "/";
  }
  return `/${pageName.toLowerCase().replace(/\s+/g, '-')}`;
}
