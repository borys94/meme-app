import { useState, useContext } from "react";

import { Stack, Box, Divider, IconButton } from "@mui/material";
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
import LoaderButton from "@components/common/LoaderButton";

import generateMeme from "@utils/generateMeme";
import canvasUtils from "@utils/canvas";

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
  const [addMemeRequest, { isLoading: isAddMemeLoading }] =
    useAddMemeMutation();

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

    const canvas = await generateMeme(template, textEl);
    if (user) {
      await addMemeRequest({
        userId: user.id,
        templateId: template.id,
        image: canvas.toDataURL(),
      });
    }
    canvasUtils.download(canvas);
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
              <Box sx={{ margin: "20px auto" }}>
                <LoaderButton
                  size="large"
                  variant="contained"
                  onClick={generate}
                  loader={isAddMemeLoading}
                >
                  Generate
                </LoaderButton>
              </Box>
              {user && (
                <Stack
                  direction="row"
                  marginTop="auto"
                  justifyContent="flex-end"
                >
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
              )}
            </Stack>
          </Stack>
        </Box>
      )}
    </Box>
  );
}
