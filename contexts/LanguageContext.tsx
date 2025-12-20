import React, { createContext, useContext, useState, ReactNode } from 'react';
import en from '@/locales/en.json';
import hi from '@/locales/hi.json';
import zh from '@/locales/zh.json';
import es from '@/locales/es.json';

export type LanguageCode = 'en' | 'hi' | 'zh' | 'es';

interface LanguageContextType {
  currentLanguage: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
  t: (key: string) => string;
  availableLanguages: Array<{ code: LanguageCode; name: string }>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<LanguageCode, any> = {
  en,
  hi,
  zh,
  es,
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('en');

  const availableLanguages: Array<{ code: LanguageCode; name: string }> = [
    { code: 'en', name: 'English (UK)' },
    { code: 'hi', name: 'Hindi' },
    { code: 'zh', name: 'Chinese' },
    { code: 'es', name: 'Spanish' },
  ];

  const handleSetLanguage = (language: LanguageCode) => {
    if (language in translations) {
      setCurrentLanguage(language);
    }
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[currentLanguage];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key;
      }
    }

    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        setLanguage: handleSetLanguage,
        t,
        availableLanguages,
      }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
