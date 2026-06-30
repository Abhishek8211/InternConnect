import { useState, useEffect } from "react";

/**
 * useDebounce — delays updating the returned value until
 * the specified delay has elapsed without a new value being set.
 *
 * @param {*}      value - Value to debounce
 * @param {number} delay - Delay in milliseconds (default: 400ms)
 * @returns {*} Debounced value
 */
export const useDebounce = (value, delay = 400) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};
