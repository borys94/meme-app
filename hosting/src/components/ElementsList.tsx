import { Stack, Box } from "@mui/material";

interface Props<T> {
  elements: T[];
  handleElementClick?: (element: T) => void;
}

const ElementsList = <T extends { url: string; id?: string }>({
  elements,
  handleElementClick,
}: Props<T>) => {
  return (
    <Stack
      gap={2}
      direction="row"
      height={96}
      overflow="auto"
      sx={{ py: 2, px: 1 }}
    >
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
          <img src={element.url} alt="meme" style={{ height: 64 }} />
        </Box>
      ))}
    </Stack>
  );
};

export default ElementsList;
