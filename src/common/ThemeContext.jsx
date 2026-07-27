import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const ThemeContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext);

function getInitialTheme() {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem("theme");
  if (stored) return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getInitialTheme);
  // Stays false until after the first client render, so hydration always
  // matches the statically pre-rendered (theme-less) markup. See index.html
  // for the blocking script that avoids a full-page color flash instead.
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Intentional: this is the standard hydration-safe "mounted" flag
    // (see https://react.dev/reference/react-dom/client/hydrateRoot#handling-different-client-and-server-content),
    // not state synced from an external system.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    // Only reflects `theme` onto the DOM. Persisting to localStorage happens
    // in toggleTheme, so a preference inferred from prefers-color-scheme
    // keeps following the system setting until the user makes an explicit
    // choice, instead of being pinned on the very first visit.
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
