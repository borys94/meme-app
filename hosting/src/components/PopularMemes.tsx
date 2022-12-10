import { Stack, Box } from "@mui/material";
import { useCollectionData, QUERIES } from "@services/queries";
import { TemplateModel, TEMPLATE_STATUS } from "@shared/models/template";

interface Props {
  handleTemplateClick: (template: TemplateModel) => void;
}

export default function PopularMemes({ handleTemplateClick }: Props) {
  const [templates] = useCollectionData<TemplateModel>(QUERIES.GET_TEMPLATES, {
    status: TEMPLATE_STATUS.PUBLISHED,
  });

  return (
    <Stack gap={2} direction="row" height={64}>
      {templates?.map((template) => (
        <Box
          sx={{ cursor: "pointer" }}
          onClick={() => handleTemplateClick(template)}
          key={template.uid}
        >
          <img src={template.url} alt="meme" style={{ maxHeight: 64 }} />
        </Box>
      ))}
    </Stack>
  );
}
