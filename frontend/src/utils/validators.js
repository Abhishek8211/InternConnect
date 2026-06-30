/**
 * Client-side validation helpers for InternConnect forms.
 */

/** Check if a string is a valid email */
export const isValidEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

/** Check if a password meets the minimum requirements */
export const isStrongPassword = (password) => password?.length >= 8;

/** Check if a URL is valid (http/https) */
export const isValidUrl = (url) => {
  try {
    const parsed = new URL(url);
    return ["http:", "https:"].includes(parsed.protocol);
  } catch {
    return false;
  }
};

/** Validate file type against an allowlist */
export const isAllowedFileType = (file, allowedTypes) =>
  allowedTypes.includes(file.type);

/** Validate file size in MB */
export const isFileSizeValid = (file, maxMB = 5) =>
  file.size <= maxMB * 1024 * 1024;

/** Format file size for display */
export const formatFileSize = (bytes) => {
  if (bytes < 1024)       return `${bytes} B`;
  if (bytes < 1024 ** 2)  return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 ** 2).toFixed(1)} MB`;
};
