import { useState, useCallback } from "react";

/**
 * usePagination — manages pagination state.
 *
 * @param {number} initialPage  - Starting page (default: 1)
 * @param {number} initialLimit - Items per page (default: 12)
 * @returns {Object} { page, limit, setPage, setLimit, goToNext, goToPrev, reset }
 */
export const usePagination = (initialPage = 1, initialLimit = 12) => {
  const [page, setPage]   = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);

  const goToNext = useCallback((totalPages) => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  }, []);

  const goToPrev = useCallback(() => {
    setPage((prev) => Math.max(prev - 1, 1));
  }, []);

  const reset = useCallback(() => {
    setPage(initialPage);
  }, [initialPage]);

  return { page, limit, setPage, setLimit, goToNext, goToPrev, reset };
};
