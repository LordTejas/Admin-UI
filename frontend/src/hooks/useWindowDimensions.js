import { useState, useEffect } from "react";


/**
 * @typedef dimensions
 * @type {object}
 * @property {number} width - Width of the viewport (window)
 * @property {number} height - Width of the viewport (height)
 */


/**
 * Custom React Hook to give live width and height of viewport (window)
 * 
 * 
 * @returns {dimensions}
 * @example
 * const {width, height} = useWindowDimensions();
 */

export default function useWindowDimensions() {
  const hasWindow = typeof window !== "undefined";

  function getWindowDimensions() {
    const width = hasWindow ? window.innerWidth : null;
    const height = hasWindow ? window.innerHeight : null;
    return {
      width,
      height,
    };
  }

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    if (hasWindow) {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [hasWindow]);

  return windowDimensions;
}
