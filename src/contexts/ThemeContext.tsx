import {  createContext, useContext, useEffect, useState } from 'react';
import type {ReactNode} from 'react';


type Theme = 'white' | 'dark' | 'navy' | 'midnight' | 'grayish';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  themes: Array<Theme>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const availableThemes: Array<Theme> = ['white', 'dark', 'grayish', 'navy', 'midnight'];

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('white');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const value: ThemeContextType = {
    theme,
    setTheme,
    themes: availableThemes,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
