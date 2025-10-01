import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getTranslation, Translation, supportedLanguages, LanguageOption, Language } from '../i18n/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: Translation;
  supportedLanguages: LanguageOption[];
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Initialize language from localStorage or default to English
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('opensense-language');
      if (stored && supportedLanguages.some(lang => lang.code === stored)) {
        return stored as Language;
      }

      // Try to detect browser language
      const browserLang = navigator.language.split('-')[0];
      if (supportedLanguages.some(lang => lang.code === browserLang)) {
        return browserLang as Language;
      }
    }
    return 'en';
  });

  // Get current translation
  const t = getTranslation(language);

  // Get current language option to check RTL
  const currentLangOption = supportedLanguages.find(lang => lang.code === language);
  const isRTL = currentLangOption?.isRTL || false;

  // Set language and persist to localStorage
  const setLanguage = (newLanguage: Language) => {
    if (supportedLanguages.some(lang => lang.code === newLanguage)) {
      setLanguageState(newLanguage);
      localStorage.setItem('opensense-language', newLanguage);

      // Set document direction for RTL languages
      const newLangOption = supportedLanguages.find(lang => lang.code === newLanguage);
      document.documentElement.dir = newLangOption?.isRTL ? 'rtl' : 'ltr';
      document.documentElement.lang = newLanguage;
    }
  };

  // Set initial document properties
  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, isRTL]);

  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
    supportedLanguages,
    isRTL
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;