import { Stack, Box } from "@mui/material";
import { TemplateModel } from "@shared/models/template";

interface Props {
  templates: TemplateModel[];
  handleTemplateClick?: (template: TemplateModel) => void;
}

const TemplatesList = ({ templates, handleTemplateClick }: Props) => {
  return (
    <Stack
      gap={2}
      direction="row"
      height={96}
      overflow="auto"
      sx={{ py: 2, px: 1 }}
    >
      {templates?.map((template) => (
        <Box
          sx={{
            cursor: "pointer",
            transition: "all 150ms",
            ":hover": {
              transform: "scale(1.1)",
            },
          }}
          onClick={() => handleTemplateClick(template)}
          key={template.id}
        >
          <img src={template.url} alt="meme" style={{ height: 64 }} />
        </Box>
      ))}
    </Stack>
  );
};

export default TemplatesList;
