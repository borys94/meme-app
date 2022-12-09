import { useContext } from "react";

import { AppContext } from "@components/AppContextProvider";

export const AdminLayout = () => {
  const { isAdmin } = useContext(AppContext);

  if (isAdmin) {
    return <span>s</span>;
  }

  return <span>s</span>;
};
