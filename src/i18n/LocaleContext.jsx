import { createContext, useContext } from "react";
import PropTypes from "prop-types";
import { translations, defaultLocale } from "./translations";

const LocaleContext = createContext(defaultLocale);

export function LocaleProvider({ locale, children }) {
  return (
    <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
  );
}

LocaleProvider.propTypes = {
  locale: PropTypes.oneOf(Object.keys(translations)).isRequired,
  children: PropTypes.node.isRequired,
};

// eslint-disable-next-line react-refresh/only-export-components
export function useLocale() {
  return useContext(LocaleContext);
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTranslation() {
  const locale = useLocale();
  return { t: translations[locale], locale };
}
