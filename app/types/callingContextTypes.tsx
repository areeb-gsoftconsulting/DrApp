export type Theme = 'light' | 'dark';
export type UserStatus = 'online' | 'offline' | 'busy';
export type UserName = string;
export type CurrentUser = object;
export type Message = string;
export type CallingContextType = {
  theme: Theme;
  userStatus: UserStatus;
  changeTheme: (theme: Theme) => void;
  changeUserStatus: (userStatus: UserStatus) => void;
  userName: UserName;
  message: Message;
  changeMessage: (message: Message) => void;
  currentUser: CurrentUser;
  changeUserName: (userName: UserName) => void;
  createNewUser: () => void;
  sendMessage: () => void;
  endJob: () => void;
};
