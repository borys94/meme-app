import { Box, Stack, Paper } from "@mui/material";

import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import DeleteIcon from "@mui/icons-material/Delete";

import { TemplateTextStyles } from "@shared/models/template";

import { Button } from "./styles";
import FontButton from "./FontButton";
import FontSizeButton from "./FontSizeButton";
import FontColorButton from "./FontColorButton";
import TextAlignButton from "./TextAlignButton";

interface Props extends TemplateTextStyles {
  scale?: number;
  fixed?: boolean;
  onChange: (styles: TemplateTextStyles) => void;
  onDelete: () => void;
}

const Toolbar = ({
  scale = 1,
  fixed = false,
  onChange,
  onDelete,
  ...textStyles
}: Props) => {
  return (
    <Box
      position={fixed ? "fixed" : "absolute"}
      sx={{
        ...(fixed
          ? {
              bottom: 0,
              left: 0,
              right: 0,
              margin: "auto",
            }
          : {
              top: -90,
            }),
        zIndex: 10,

        transform: `scale(${scale})`,
        transformOrigin: "top left",
      }}
    >
      <Stack
        gap={1}
        alignItems="baseline"
        direction="row"
        justifyContent="center"
      >
        <Paper elevation={4} sx={{ display: "flex", my: 2 }}>
          <FontButton
            fontFamily={textStyles.fontFamily}
            onChange={(fontFamily) => onChange({ ...textStyles, fontFamily })}
          />
          <FontSizeButton
            fontSize={textStyles.fontSize}
            onChange={(fontSize) => onChange({ ...textStyles, fontSize })}
          />
          <Button
            active={textStyles.bold}
            onClick={() => onChange({ ...textStyles, bold: !textStyles.bold })}
          >
            <FormatBoldIcon fontSize="large" />
          </Button>
          <Button
            active={textStyles.underline}
            onClick={() =>
              onChange({ ...textStyles, underline: !textStyles.underline })
            }
          >
            <FormatUnderlinedIcon fontSize="large" />
          </Button>
          <Button
            active={textStyles.italic}
            onClick={() =>
              onChange({ ...textStyles, italic: !textStyles.italic })
            }
          >
            <FormatItalicIcon fontSize="large" />
          </Button>
          <FontColorButton
            color={textStyles.color}
            shadowColor={textStyles.shadowColor}
            onChange={(color, shadowColor) =>
              onChange({ ...textStyles, color, shadowColor })
            }
          />
          <TextAlignButton
            textAlign={textStyles.textAlign}
            onChange={(textAlign) => onChange({ ...textStyles, textAlign })}
          />
          <Button onClick={onDelete}>
            <DeleteIcon fontSize="large" />
          </Button>
        </Paper>
      </Stack>
    </Box>
  );
};

export default Toolbar;
