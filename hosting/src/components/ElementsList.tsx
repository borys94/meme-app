import { Stack, Box, Skeleton } from "@mui/material";
import Fade from "./common/Fade";

interface Props<T> {
  elements: T[];
  handleElementClick?: (element: T) => void;
  isLoading?: boolean;
}

const HEIGHT = 64;

const ElementsList = <T extends { url: string; id?: string }>({
  elements,
  handleElementClick,
  isLoading = false,
}: Props<T>) => {
  return (
    <Stack
      gap={2}
      direction="row"
      position="relative"
      height={96}
      overflow="auto"
      sx={{ py: 2, px: 1 }}
    >
      {isLoading &&
        new Array(9).fill(0).map((el, index) => (
          <Skeleton
            sx={{
              position: "absolute",
              left: ((HEIGHT * 4) / 3) * index + index * 16,
            }}
            component="div"
            variant="rectangular"
            animation="wave"
            width={(HEIGHT * 4) / 3}
            height={HEIGHT}
          />
        ))}
      {elements?.map((element) => (
        <Box
          sx={{
            cursor: "pointer",
            transition: "all 150ms",
            ":hover": {
              transform: "scale(1.1)",
            },
          }}
          onClick={() => handleElementClick(element)}
          key={element.id}
        >
          <Fade>
            <img src={element.url} alt="meme" height={HEIGHT} />
          </Fade>
        </Box>
      ))}
    </Stack>
  );
};

export default ElementsList;
