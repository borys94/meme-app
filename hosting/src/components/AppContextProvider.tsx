import { createContext, FC, useState } from "react";
import { User } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "../FirebaseConfig";
import { useDocument, QUERIES } from "@services/queries";
import { UserModel } from "@shared/models/user";

interface AppContextModel {
  firebaseUser?: User | null;
  user: UserModel | null;
  isAdmin: boolean;
}

const initialState: AppContextModel = {
  firebaseUser: null,
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

  const [firebaseUser, loading] = useAuthState(auth, {
    onUserChanged: async (user) => {
      if (user) {
        setIsAdmin((await user.getIdTokenResult())?.claims.role === "admin");
      } else {
        setIsAdmin(false);
      }
      setRoleLoading(false);
    },
  });
  const [user] = useDocument<UserModel>(QUERIES.GET_USER, {
    userId: firebaseUser?.uid,
  });

  if (loading || roleLoading || (firebaseUser && !user)) {
    return <div>Loading</div>;
  }

  return (
    <AppContext.Provider
      value={{
        firebaseUser,
        user,
        isAdmin,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
