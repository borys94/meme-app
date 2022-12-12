import { useContext } from "react";
import { Box, Stack } from "@mui/material";

import { useCollectionData, QUERIES } from "@services/queries";
import { MemeModel } from "@shared/models/meme";
import { AppContext } from "@components/AppContextProvider";

const MyMemes = () => {
  const { user } = useContext(AppContext);
  const [memes] = useCollectionData<MemeModel>(QUERIES.GET_USER_MEMES, {
    userId: user.id,
  });

  return (
    <Stack gap={2} direction="row">
      {memes?.map((meme) => (
        <Box sx={{ cursor: "pointer" }} key={meme.id}>
          <img src={meme.url} alt="meme" style={{ maxHeight: 128 }} />
        </Box>
      ))}
    </Stack>
  );
};

export default MyMemes;
