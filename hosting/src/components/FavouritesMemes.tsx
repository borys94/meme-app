import { useContext } from "react";

import { Stack, Box } from "@mui/material";
import { useCollectionData, QUERIES } from "@services/queries";
import { TemplateModel } from "@shared/models/template";

import { AppContext } from "@components/AppContextProvider";

export default function FavouritesMemes() {
  const { user } = useContext(AppContext);

  const [favourites] = useCollectionData<TemplateModel>(
    QUERIES.GET_FAVOURITES,
    {
      userId: user?.uid,
    }
  );

  return (
    <Stack gap={2} direction="row" height={64}>
      {favourites?.map((template) => (
        <Box
          // onClick={() => setCurrentTemplate(template)}
          key={template.uid}
        >
          <img src={template.url} alt="meme" style={{ maxHeight: 64 }} />
        </Box>
      ))}
    </Stack>
  );
}
