import { useState, useContext, ReactNode } from "react";

import {
  Stack,
  Tabs,
  Tab,
  Box,
  Divider,
  IconButton,
  Button,
} from "@mui/material";
import { useCollectionData, QUERIES } from "@services/queries";
import {
  TemplateModel,
  TemplateText,
  TEMPLATE_STATUS,
} from "@shared/models/template";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import {
  useAddFavouriteMutation,
  useRemoveFavouriteMutation,
} from "@stores/api/user";
import { AppContext } from "@components/AppContextProvider";
import TemplateEditor from "@components/TemplateEditor";

import canvasUtils from "@utils/canvas";
import generateMeme from "@utils/generateMeme";

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const { user } = useContext(AppContext);

  const [value, setValue] = useState(0);
  const [texts, setTexts] = useState<TemplateText[]>([]);
  const [currentTemplate, setCurrentTemplate] = useState<TemplateModel | null>(
    null
  );
  const [templates] = useCollectionData<TemplateModel>(QUERIES.GET_TEMPLATES, {
    status: TEMPLATE_STATUS.PUBLISHED,
  });
  const [favourites] = useCollectionData<TemplateModel>(
    QUERIES.GET_FAVOURITES,
    {
      userId: user?.uid,
    }
  );
  const [addFavouriteRequest, { isLoading: isAddFavouriteLoading }] =
    useAddFavouriteMutation();
  const [removeFavouriteRequest, { isLoading: isRemoveFavouriteLoading }] =
    useRemoveFavouriteMutation();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const addFavourite = () => {
    addFavouriteRequest({
      userId: user.uid,
      templateId: currentTemplate.uid,
    });
  };

  const removeFavourite = () => {
    removeFavouriteRequest({
      userId: user.uid,
      templateId: currentTemplate.uid,
    });
  };

  const handleTemplateClick = (template: TemplateModel) => {
    setCurrentTemplate(template);
    setTexts([...template.texts]);
  };

  const generate = async () => {
    const textEl = document.querySelectorAll(
      ".editable-text"
    ) as any as Element[];

    generateMeme(currentTemplate, textEl);
  };

  console.log(currentTemplate);
  console.log(favourites);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Popular" {...a11yProps(0)} />
          <Tab label="Favourites" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Stack gap={2} direction="row">
          {templates?.map((template) => (
            <Box
              onClick={() => handleTemplateClick(template)}
              key={template.uid}
            >
              <img src={template.url} alt="meme" style={{ maxHeight: 64 }} />
            </Box>
          ))}
        </Stack>
        <Divider sx={{ my: 2 }} />
        {currentTemplate && (
          <Box>
            <Stack direction="row" gap={4}>
              <TemplateEditor
                template={currentTemplate}
                texts={texts}
                onChange={setTexts}
              />
              <Stack flexGrow={1} justifyContent="flex-start">
                <Box>
                  <Button variant="contained" onClick={generate}>
                    Generate
                  </Button>
                </Box>
                <Stack
                  direction="row"
                  marginTop="auto"
                  justifyContent="flex-end"
                >
                  {favourites.find(
                    (favourite) => favourite.uid === currentTemplate.uid
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
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Stack gap={2} direction="row">
          {favourites?.map((template) => (
            <Box
              onClick={() => setCurrentTemplate(template)}
              key={template.uid}
            >
              <img src={template.url} alt="meme" style={{ maxHeight: 64 }} />
            </Box>
          ))}
        </Stack>
      </TabPanel>
    </Box>
  );
}
