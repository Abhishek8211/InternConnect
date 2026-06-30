/**
 * Date formatting utilities for InternConnect.
 */

/**
 * Format a date as a relative time string (e.g. "3 days ago").
 * @param {string|Date} date
 * @returns {string}
 */
export const timeAgo = (date) => {
  const now = new Date();
  const diff = now - new Date(date);
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours   = Math.floor(minutes / 60);
  const days    = Math.floor(hours / 24);
  const weeks   = Math.floor(days / 7);
  const months  = Math.floor(days / 30);

  if (seconds < 60)   return "just now";
  if (minutes < 60)   return `${minutes}m ago`;
  if (hours < 24)     return `${hours}h ago`;
  if (days < 7)       return `${days}d ago`;
  if (weeks < 4)      return `${weeks}w ago`;
  if (months < 12)    return `${months}mo ago`;
  return formatDate(date);
};

/**
 * Format a date as "DD MMM YYYY" (e.g. "15 Jun 2025").
 * @param {string|Date} date
 * @returns {string}
 */
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

/**
 * Format a date as "MMM YYYY" (e.g. "Jun 2025").
 * @param {string|Date} date
 * @returns {string}
 */
export const formatMonthYear = (date) => {
  return new Date(date).toLocaleDateString("en-IN", {
    month: "short",
    year: "numeric",
  });
};

/**
 * Check if a deadline date has passed.
 * @param {string|Date} deadline
 * @returns {boolean}
 */
export const isDeadlinePassed = (deadline) => {
  return new Date(deadline) < new Date();
};

/**
 * Get days remaining until a deadline.
 * @param {string|Date} deadline
 * @returns {number} — negative if passed
 */
export const daysUntilDeadline = (deadline) => {
  const diff = new Date(deadline) - new Date();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};
