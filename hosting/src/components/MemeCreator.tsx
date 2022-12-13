import { useState, useContext, useEffect, useRef } from "react";
import {
  Stack,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DownloadIcon from "@mui/icons-material/Download";
import AddIcon from "@mui/icons-material/Add";

import {
  useAddFavouriteMutation,
  useRemoveFavouriteMutation,
  useAddMemeMutation,
} from "@stores/api/user";
import { AppContext } from "@components/AppContextProvider";
import TemplateEditor from "@components/TemplateEditor";

import { useCollectionData, QUERIES } from "@services/queries";
import { TemplateModel, TemplateText } from "@shared/models/template";
import generateMeme from "@utils/generateMeme";
import canvasUtils from "@utils/canvas";
import { createEmptyText } from "@utils/createEmptyText";
import { dispatchMouseDownEvent } from "@utils/dispatchMouseDownEvent";

interface Props {
  template: TemplateModel | null;
}

export default function MemeCreator({ template }: Props) {
  const textRefs = useRef([]);
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

  const uploadMeme = async () => {
    const canvas = await getCanvasMeme();
    if (user) {
      await addMemeRequest({
        userId: user.id,
        templateId: template.id,
        image: canvas.toDataURL(),
      });
    }
  };

  const downloadMeme = async () => {
    canvasUtils.download(await getCanvasMeme());
  };

  const getCanvasMeme = () => {
    return generateMeme(template, textRefs.current);
  };

  const addText = () => {
    setTexts([
      ...texts,
      createEmptyText(texts.length ? texts[texts.length - 1] : null),
    ]);
  };

  useEffect(() => {
    const focusLastInput = async () => {
      await new Promise<void>((res) => setTimeout(res, 0));
      if (textRefs.current.length) {
        dispatchMouseDownEvent(textRefs.current[0]);
      }
    };
    focusLastInput();
  }, [textRefs.current]);

  return (
    <Box sx={{ width: "100%", mb: 4 }}>
      <Divider sx={{ mb: 4 }} />
      {template && (
        <Box>
          <Stack
            direction={{ md: "row", xs: "column" }}
            justifyContent="center"
          >
            <TemplateEditor
              template={template}
              textRefs={textRefs}
              texts={texts}
              onChange={setTexts}
            />
            <Stack>
              <List>
                <ListItem disablePadding>
                  <ListItemButton onClick={downloadMeme}>
                    <ListItemIcon>
                      <DownloadIcon />
                    </ListItemIcon>
                    <ListItemText primary="Download" />
                  </ListItemButton>
                </ListItem>
                {user && (
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={uploadMeme}
                      disabled={isAddMemeLoading}
                    >
                      <ListItemIcon>
                        <CloudUploadIcon />
                      </ListItemIcon>
                      <ListItemText primary="Upload" />
                    </ListItemButton>
                  </ListItem>
                )}
                <ListItem disablePadding>
                  <ListItemButton onClick={addText}>
                    <ListItemIcon>
                      <AddIcon />
                    </ListItemIcon>
                    <ListItemText primary="Add text" />
                  </ListItemButton>
                </ListItem>
              </List>
              {user && (
                <Stack
                  direction="row"
                  marginTop="auto"
                  justifyContent="flex-start"
                  marginLeft={2}
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
