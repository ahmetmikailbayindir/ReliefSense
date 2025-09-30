import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getTranslation, Translation, supportedLanguages } from '../i18n/translations';

interface LanguageContextType {
  language: string;
  setLanguage: (language: string) => void;
  t: Translation;
  supportedLanguages: typeof supportedLanguages;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Initialize language from localStorage or default to English
  const [language, setLanguageState] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('opensense-language');
      if (stored && supportedLanguages.some(lang => lang.code === stored)) {
        return stored;
      }

      // Try to detect browser language
      const browserLang = navigator.language.split('-')[0];
      if (supportedLanguages.some(lang => lang.code === browserLang)) {
        return browserLang;
      }
    }
    return 'en';
  });

  // Get current translation
  const t = getTranslation(language);

  // Check if language is RTL
  const isRTL = language === 'ar';

  // Set language and persist to localStorage
  const setLanguage = (newLanguage: string) => {
    if (supportedLanguages.some(lang => lang.code === newLanguage)) {
      setLanguageState(newLanguage);
      localStorage.setItem('opensense-language', newLanguage);

      // Set document direction for RTL languages
      document.documentElement.dir = newLanguage === 'ar' ? 'rtl' : 'ltr';
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