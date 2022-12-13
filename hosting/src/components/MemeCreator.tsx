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
import LoaderButton from "@components/common/LoaderButton";

import generateMeme from "@utils/generateMeme";
import canvasUtils from "@utils/canvas";
import { createEmptyText } from "@utils/createEmptyText";

interface Props {
  template: TemplateModel | null;
}

export default function MemeCreator({ template }: Props) {
  const { user } = useContext(AppContext);
  const [texts, setTexts] = useState<TemplateText[]>([]);
  const [textRefs, setTextRefs] = useState<Element[]>([]);
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
    const canvas = await generateMeme(template, textRefs);
    if (user) {
      await addMemeRequest({
        userId: user.id,
        templateId: template.id,
        image: canvas.toDataURL(),
      });
    }
    canvasUtils.download(canvas);
  };

  const onTextRefs = (textRefs: Element[]) => {
    setTextRefs(textRefs);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Divider sx={{ mb: 2 }} />
      {template && (
        <Box>
          <Stack direction="row" gap={4}>
            <TemplateEditor
              template={template}
              onTextRefs={onTextRefs}
              texts={texts}
              onChange={setTexts}
            />
            <Stack flexGrow={1} justifyContent="flex-start">
              <Stack sx={{ margin: "20px auto" }} gap={2}>
                <LoaderButton
                  size="large"
                  variant="contained"
                  onClick={generate}
                  loader={isAddMemeLoading}
                >
                  Generate
                </LoaderButton>
                <Button
                  variant="outlined"
                  onClick={() =>
                    setTexts([
                      ...texts,
                      createEmptyText(
                        texts.length ? texts[texts.length - 1] : null
                      ),
                    ])
                  }
                >
                  Add text
                </Button>
              </Stack>
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
