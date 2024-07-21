import { createContext, useState } from "react";

const defaultContext = {
  firstName: "Divid",
  lastName: "Blasbasld",
  age: 123,
};

export const UserContext = createContext(defaultContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(defaultContext);
  const value = { user, setUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
