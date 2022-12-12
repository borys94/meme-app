import { useContext } from "react";

import { useCollectionData, QUERIES } from "@services/queries";
import { TemplateModel } from "@shared/models/template";

import { AppContext } from "@components/AppContextProvider";
import TemplatesList from "@components/TemplatesList";

const FavouritesMemes = () => {
  const { user } = useContext(AppContext);
  const [favourites] = useCollectionData<TemplateModel>(
    QUERIES.GET_FAVOURITES,
    {
      userId: user?.id,
    }
  );

  return <TemplatesList templates={favourites} />;
};

export default FavouritesMemes;
