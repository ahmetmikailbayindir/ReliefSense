export const translations = {
  en: {
    name: 'English',
    dashboard: 'Dashboard',
    network: 'Network',
    database: 'Database',
    crops: 'Crops',
    logs: 'System Logs'
  },
  ar: {
    name: 'العربية',
    dashboard: 'لوحة القيادة',
    network: 'الشبكة',
    database: 'قاعدة البيانات',
    crops: 'المحاصيل',
    logs: 'سجلات النظام'
  },
  fr: {
    name: 'Français',
    dashboard: 'Tableau de bord',
    network: 'Réseau',
    database: 'Base de données',
    crops: 'Cultures',
    logs: 'Journaux système'
  },
  es: {
    name: 'Español',
    dashboard: 'Panel',
    network: 'Red',
    database: 'Base de datos',
    crops: 'Cultivos',
    logs: 'Registros del sistema'
  },
  tr: {
    name: 'Türkçe',
    dashboard: 'Gösterge Paneli',
    network: 'Ağ',
    database: 'Veritabanı',
    crops: 'Ürünler',
    logs: 'Sistem Günlükleri'
  },
  ku: {
    name: 'کوردی',
    dashboard: 'پانێل',
    network: 'تۆڕ',
    database: 'بنکەدراوە',
    crops: 'دانەوێڵە',
    logs: 'تۆمارەکان'
  }
}

export type Language = keyof typeof translations
export type TranslationKey = keyof typeof translations.en
export type Translation = typeof translations.en

export const supportedLanguages: Language[] = ['en', 'ar', 'fr', 'es', 'tr', 'ku']

export function getTranslation(lang: Language): Translation {
  return translations[lang] || translations.en
}
