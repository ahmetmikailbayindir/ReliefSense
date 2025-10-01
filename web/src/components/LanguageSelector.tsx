import React, { useState } from 'react';
import { ChevronDown, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage, supportedLanguages, isRTL } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = supportedLanguages.find(lang => lang.code === language);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-3 py-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors ${
          isRTL ? 'flex-row-reverse space-x-reverse' : ''
        }`}
        aria-label="Select language"
      >
        <Globe className="h-4 w-4" />
        <span className="text-sm font-medium">
          {currentLanguage?.flag} {currentLanguage?.name}
        </span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className={`absolute top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-[9999] max-h-96 overflow-y-auto ${
            isRTL ? 'left-0' : 'right-0'
          }`}>
            {supportedLanguages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2 text-left hover:bg-humanitarian-50 flex items-center space-x-3 transition-colors ${
                  language === lang.code ? 'bg-humanitarian-100 text-humanitarian-800' : 'text-gray-700'
                } ${isRTL ? 'flex-row-reverse space-x-reverse text-right' : ''}`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span className="font-medium">{lang.name}</span>
                {lang.code === 'ar' && (
                  <span className="text-xs text-gray-500 ml-auto">(RTL)</span>
                )}
              </button>
            ))}

            {/* Language coverage info */}
            <div className="border-t border-gray-200 mt-1 pt-2 px-4 py-2">
              <div className="text-xs text-gray-500">
                🌍 Humanitarian Deployment Languages
              </div>
              <div className="text-xs text-gray-400 mt-1">
                UN Official + Regional Support
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSelector;