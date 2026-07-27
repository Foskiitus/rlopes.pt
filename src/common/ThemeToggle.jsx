import PropTypes from "prop-types";
import sun from "../assets/sun.svg";
import moon from "../assets/moon.svg";
import { useTheme } from "./ThemeContext";
import { useTranslation } from "../i18n/LocaleContext";

function ThemeToggle({ className }) {
  const { theme, toggleTheme, mounted } = useTheme();
  const { t } = useTranslation();

  // Before mount, always render the light variant so hydration matches the
  // statically pre-rendered markup (see ThemeContext for details).
  const effectiveTheme = mounted ? theme : "light";
  const themeIcon = effectiveTheme === "light" ? sun : moon;
  const label =
    effectiveTheme === "light" ? t.theme.switchToDark : t.theme.switchToLight;

  return (
    <button type="button" className={className} onClick={toggleTheme} aria-label={label}>
      <img src={themeIcon} alt="" />
    </button>
  );
}

ThemeToggle.propTypes = {
  className: PropTypes.string,
};

export default ThemeToggle;
