import { useState, useContext, ReactNode } from "react";

import { Stack, Tabs, Tab, Box, Divider, IconButton } from "@mui/material";
import { useCollectionData, QUERIES } from "@services/queries";
import { TemplateModel, TEMPLATE_STATUS } from "@shared/models/template";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { useAddFavouriteMutation } from "@stores/api/user";
import { AppContext } from "@components/AppContextProvider";

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
  const [currentTemplate, setCurrentTemplate] = useState<TemplateModel | null>(
    null
  );
  const [templates] = useCollectionData<TemplateModel>(QUERIES.GET_TEMPLATES, {
    status: TEMPLATE_STATUS.PUBLISHED,
  });
  const [favourites] = useCollectionData<TemplateModel>(
    QUERIES.GET_FAVOURITES,
    {
      userId: user.uid,
    }
  );
  const [addFavouriteRequest] = useAddFavouriteMutation();

  console.log(favourites);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const addFavourite = () => {
    addFavouriteRequest({
      userId: user.uid,
      templateId: currentTemplate.uid,
    });
  };

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
              onClick={() => setCurrentTemplate(template)}
              key={template.uid}
            >
              <img src={template.url} alt="meme" style={{ maxHeight: 64 }} />
            </Box>
          ))}
        </Stack>
        {/* <Image src="/example.jpeg" alt="meme" width="512" height="512" /> */}
        {currentTemplate && (
          <Box>
            <img src={currentTemplate.url} style={{ width: 512 }} />
            <Divider />
            <IconButton color="error" onClick={() => addFavourite()}>
              <FavoriteBorderIcon />
            </IconButton>
            <IconButton color="error">
              <FavoriteIcon />
            </IconButton>
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
