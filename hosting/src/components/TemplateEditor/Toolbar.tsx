import { Box, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";

import TextFieldsIcon from "@mui/icons-material/TextFields";

const Button = styled("div")(() => ({
  width: 32,
  height: 32,
  cursor: "pointer",
}));

const Container = styled("div")(() => ({
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
      </Stack>
    </Box>
  );
};

export default Toolbar;
