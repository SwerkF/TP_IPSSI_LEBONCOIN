import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ThemeProviderProps {
    children: ReactNode;
    defaultTheme: string;
    storageKey: string;
}

interface ThemeContextProps {
    theme: string;
    setTheme: (theme: string) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, defaultTheme, storageKey }) => {
    const [theme, setTheme] = useState<string>(() => {
        const storedTheme = localStorage.getItem(storageKey);
        return storedTheme ? storedTheme : defaultTheme;
    });

    const changeTheme = (newTheme: string) => {
        setTheme(newTheme);
        localStorage.setItem(storageKey, newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme: changeTheme }}>
            <div className={`theme-${theme}`}>
                {children}
            </div>
        </ThemeContext.Provider>
    );
};

export const useTheme = (): ThemeContextProps => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};