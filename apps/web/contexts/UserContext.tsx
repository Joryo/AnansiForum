import { createContext, useState } from "react";

export interface User {
  id: string;
  email: string;
}

export interface UserContextType {
  user: User | null;
  setUser: (user: User) => void;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const savedUser = localStorage.getItem("user");

  return (
    <UserContext.Provider
      value={{ user: savedUser ? JSON.parse(savedUser) : user, setUser }}
    >
      {children}
    </UserContext.Provider>
  );
};
