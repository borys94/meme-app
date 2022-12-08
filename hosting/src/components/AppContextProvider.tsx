import { createContext, FC, useState } from "react";
import { User } from "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../FirebaseConfig";

interface AppContextModel {
  user?: User | null;
  isAdmin: boolean;
}

const initialState: AppContextModel = {
  user: null,
  isAdmin: false,
};

export const AppContext = createContext(initialState);

interface AppContextProviderProps {
  children?: JSX.Element | JSX.Element[];
}

export const AppContextProvider: FC<AppContextProviderProps> = ({
  children,
}) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [roleLoading, setRoleLoading] = useState(true);
  const [user, loading] = useAuthState(auth, {
    onUserChanged: async (user) => {
      if (user) {
        setIsAdmin((await user.getIdTokenResult())?.claims.role === "admin");
      } else {
        setIsAdmin(false);
      }
      setRoleLoading(false);
    },
  });

  if (loading || roleLoading) {
    return <div>Loading</div>;
  }

  return (
    <AppContext.Provider
      value={{
        user,
        isAdmin,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
