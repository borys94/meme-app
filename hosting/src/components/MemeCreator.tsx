import { useState, useContext } from "react";

import { Stack, Box, Divider, IconButton, Button } from "@mui/material";
import { useCollectionData, QUERIES } from "@services/queries";
import { TemplateModel, TemplateText } from "@shared/models/template";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import {
  useAddFavouriteMutation,
  useRemoveFavouriteMutation,
  useAddMemeMutation,
} from "@stores/api/user";
import { AppContext } from "@components/AppContextProvider";
import TemplateEditor from "@components/TemplateEditor";

import generateMeme from "@utils/generateMeme";

interface Props {
  template: TemplateModel | null;
}

export default function MemeCreator({ template }: Props) {
  const { user } = useContext(AppContext);
  const [texts, setTexts] = useState<TemplateText[]>([]);

  const [favourites] = useCollectionData<TemplateModel>(
    QUERIES.GET_FAVOURITES,
    {
      userId: user?.id,
    }
  );
  const [addFavouriteRequest, { isLoading: isAddFavouriteLoading }] =
    useAddFavouriteMutation();
  const [removeFavouriteRequest, { isLoading: isRemoveFavouriteLoading }] =
    useRemoveFavouriteMutation();
  const [addMemeRequest] = useAddMemeMutation();

  const addFavourite = () => {
    addFavouriteRequest({
      userId: user.id,
      templateId: template.id,
    });
  };

  const removeFavourite = () => {
    removeFavouriteRequest({
      userId: user.id,
      templateId: template.id,
    });
  };

  const generate = async () => {
    const textEl = document.querySelectorAll(
      ".editable-text"
    ) as any as Element[];

    const image = await generateMeme(template, textEl);
    addMemeRequest({
      userId: user.id,
      templateId: template.id,
      image,
    });
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Divider sx={{ mb: 2 }} />
      {template && (
        <Box>
          <Stack direction="row" gap={4}>
            <TemplateEditor
              template={template}
              texts={texts}
              onChange={setTexts}
            />
            <Stack flexGrow={1} justifyContent="flex-start">
              <Box>
                <Button variant="contained" onClick={generate}>
                  Generate
                </Button>
              </Box>
              <Stack direction="row" marginTop="auto" justifyContent="flex-end">
                {favourites.find(
                  (favourite) => favourite.id === template.id
                ) ? (
                  <IconButton
                    disabled={isRemoveFavouriteLoading}
                    color="error"
                    onClick={removeFavourite}
                  >
                    <FavoriteIcon />
                  </IconButton>
                ) : (
                  <IconButton
                    disabled={isAddFavouriteLoading}
                    color="error"
                    onClick={() => addFavourite()}
                  >
                    <FavoriteBorderIcon />
                  </IconButton>
                )}
              </Stack>
            </Stack>
          </Stack>
          <Divider />
        </Box>
      )}
    </Box>
  );
}
