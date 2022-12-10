import { Box, Stack, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";

import TextFieldsIcon from "@mui/icons-material/TextFields";
import EditIcon from "@mui/icons-material/Edit";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";

const Button = styled("div")(({ theme }) => ({
  width: 32,
  height: 32,
  cursor: "pointer",
  // backgroundColor: theme.palette.primary.main,
}));

const Container = styled("div")(({ theme }) => ({
  height: 32,
  borderRadius: 5,
  border: "1px solid",
}));

const Toolbar = () => {
  return (
    <Box position="relative">
      <Stack gap={1} alignItems="baseline" direction="row">
        <Container>
          <Button>
            <TextFieldsIcon />
          </Button>
        </Container>
        {/* <IconButton>
          <TextFieldsIcon />
        </IconButton>
        <IconButton>
          <EditIcon />
        </IconButton>
        <Stack gap={1} direction="row">
          <IconButton>
            <UndoIcon />
          </IconButton>
          <IconButton disabled>
            <RedoIcon />
          </IconButton>
        </Stack> */}
      </Stack>
    </Box>
  );
};

export default Toolbar;
