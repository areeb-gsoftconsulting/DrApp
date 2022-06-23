export type Theme = 'light' | 'dark';
export type UserStatus = 'online' | 'offline' | 'busy';
export type ThemeContextType = {
  theme: Theme;
  userStatus: UserStatus;
  changeTheme: (theme: Theme) => void;
  changeUserStatus: (userStatus: UserStatus) => void;
};
