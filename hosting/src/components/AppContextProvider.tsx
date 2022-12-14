import { createContext, FC, useState } from "react";
import { User } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "../FirebaseConfig";
import { useDocument, useCollectionData, QUERIES } from "@services/queries";
import { UserModel } from "@shared/models/user";
import { TemplateModel, TEMPLATE_STATUS } from "@shared/models/template";
import { MemeModel } from "@shared/models/meme";

interface AppContextModel {
  firebaseUser?: User | null;
  user: UserModel | null;
  isAdmin: boolean;
  favourites: TemplateModel[] | null;
  templates: TemplateModel[] | null;
  memes: MemeModel[] | null;
}

const initialState: AppContextModel = {
  firebaseUser: null,
  user: null,
  isAdmin: false,
  favourites: null,
  templates: null,
  memes: null,
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
  const [templates] = useCollectionData<TemplateModel>(QUERIES.GET_TEMPLATES, {
    status: TEMPLATE_STATUS.PUBLISHED,
  });
  const [memes] = useCollectionData<MemeModel>(QUERIES.GET_USER_MEMES, {
    userId: user?.id,
  });
  const [favourites] = useCollectionData<TemplateModel>(
    QUERIES.GET_FAVOURITES,
    {
      userId: user?.id,
    }
  );

  if (loading || roleLoading || (firebaseUser && !user)) {
    return <div>Loading</div>;
  }

  return (
    <AppContext.Provider
      value={{
        firebaseUser,
        user,
        isAdmin,
        favourites,
        templates,
        memes,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
