'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Locale = 'vi' | 'en';
type Dictionary = Record<string, any>;

interface I18nContextProps {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: (key: string, namespace?: 'errors' | 'common') => string;
}

const I18nContext = createContext<I18nContextProps | undefined>(undefined);

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
    vi: () => import('../dictionaries/vi.json').then((module) => module.default),
    en: () => import('../dictionaries/en.json').then((module) => module.default),
};

export const I18nProvider: React.FC<{ children: React.ReactNode; initialLocale?: Locale }> = ({
    children,
    initialLocale = 'vi'
}) => {
    const [locale, setLocaleState] = useState<Locale>(initialLocale);
    const [dictionary, setDictionary] = useState<Dictionary | null>(null);

    useEffect(() => {
        let isMounted = true;
        dictionaries[locale]().then((dict) => {
            if (isMounted) setDictionary(dict);
        });
        return () => {
            isMounted = false;
        };
    }, [locale]);

    const setLocale = (newLocale: Locale) => {
        setLocaleState(newLocale);
        // In a real app, you might want to sync this with localStorage or cookies
        if (typeof window !== 'undefined') {
            localStorage.setItem('preferred_locale', newLocale);
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedLocale = localStorage.getItem('preferred_locale') as Locale;
            if (savedLocale && (savedLocale === 'vi' || savedLocale === 'en')) {
                setLocaleState(savedLocale);
            }
        }
    }, []);

    const t = (key: string, namespace: 'errors' | 'common' = 'common'): string => {
        if (!dictionary) return key;

        const value = dictionary[namespace]?.[key];
        return value || key;
    };

    return (
        <I18nContext.Provider value={{ locale, setLocale, t }}>
            {children}
        </I18nContext.Provider>
    );
};

export const useI18n = () => {
    const context = useContext(I18nContext);
    if (context === undefined) {
        throw new Error('useI18n must be used within an I18nProvider');
    }
    return context;
};
