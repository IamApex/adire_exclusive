"use client";

import { useEffect, useState } from "react";

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        console.error("Error reading LocalStorage", error);
      }
      return initialValue;
    } else {
      return initialValue;
    }
  });

  useEffect(
    function () {
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(key, JSON.stringify(storedValue));
          console.log(storedValue);
        } catch (error) {
          console.error("Error writing to LocalStorage", error);
        }
      }
    },
    [key, storedValue]
  );
  return [storedValue, setStoredValue];
}
