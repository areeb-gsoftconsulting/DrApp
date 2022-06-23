import * as React from 'react';
import {Theme, UserStatus, ThemeContextType} from '../types/theme';

export const ThemeContext = React.createContext<ThemeContextType | null>(null);

const ThemeProvider: React.FC<React.ReactNode> = ({children}) => {
  const [themeMode, setThemeMode] = React.useState<Theme>('light');
  const [currentStatus, setcurrentStatus] =React.useState<UserStatus>('offline');
  return (
    <ThemeContext.Provider
      value={{
        theme: themeMode,
        changeTheme: setThemeMode,
        userStatus: currentStatus,
        changeUserStatus: setcurrentStatus,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
