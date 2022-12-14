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
  const [shouldFocusLastInput, setShouldFocusLastInput] = useState(false);
  const { user, favourites, templates } = useContext(AppContext);
  const [texts, setTexts] = useState<TemplateText[]>([]);
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
    if (user) {
      const canvas = await getCanvasMeme();
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
    setShouldFocusLastInput(true);
  };

  useEffect(() => {
    if (shouldFocusLastInput) {
      if (textRefs.current.length && textRefs.current[0]) {
        dispatchMouseDownEvent(textRefs.current[0]);
      }
      setShouldFocusLastInput(false);
    }
  }, [shouldFocusLastInput]);

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
                  alignItems="center"
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
                  {templates.find((t) => t.id === template.id).likes}
                </Stack>
              )}
            </Stack>
          </Stack>
        </Box>
      )}
    </Box>
  );
}
