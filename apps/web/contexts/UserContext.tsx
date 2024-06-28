import React, { createContext, useState } from "react";

import { User } from "@/types";

export interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);

  const savedUser =
    typeof window !== "undefined" ? localStorage.getItem("user") : null;

  const setUserAndPersist = (user: User | null) => {
    setUser(user);
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(user));
    }
  };

  return (
    <UserContext.Provider
      value={{
        user: savedUser ? JSON.parse(savedUser) : user,
        setUser: setUserAndPersist,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
