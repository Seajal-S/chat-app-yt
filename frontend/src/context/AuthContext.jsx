// import { createContext, useContext, useState } from "react";

// export const AuthContext = createContext();

// export const useAuthContext = () => {
//   return useContext(AuthContext);
// };

// export const AuthContextProvider = ({ children }) => {
//   const [authUser, setAuthUser] = useState(
//     JSON.parse(localStorage.getItem("chat-user"))
//   );

//   return (
//     <AuthContext.Provider value={{ authUser, setAuthUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
import { createContext, useContext, useState } from "react";

export const AuthContext = createContext(null);

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const storedUser = localStorage.getItem("chat-user");

  const [authUser, setAuthUser] = useState(
    storedUser ? JSON.parse(storedUser) : null
  );

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
