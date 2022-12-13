import { useContext } from "react";

import { useCollectionData, QUERIES } from "@services/queries";
import { TemplateModel } from "@shared/models/template";

import { AppContext } from "@components/AppContextProvider";
import TemplatesList from "@components/TemplatesList";
import RequiredSignedIn from "@components/common/RequiredSignedIn";

interface Props {
  handleTemplateClick: (template: TemplateModel) => void;
}

const FavouritesMemes = ({ handleTemplateClick }: Props) => {
  const { user } = useContext(AppContext);
  const [favourites] = useCollectionData<TemplateModel>(
    QUERIES.GET_FAVOURITES,
    {
      userId: user?.id,
    }
  );

  return (
    <RequiredSignedIn message="Sign in to see your favourites memes">
      <TemplatesList
        templates={favourites}
        handleTemplateClick={handleTemplateClick}
      />
    </RequiredSignedIn>
  );
};

export default FavouritesMemes;
