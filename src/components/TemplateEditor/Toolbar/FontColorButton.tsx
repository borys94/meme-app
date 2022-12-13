import { useState } from "react";
import {
  Popover,
  Box,
  Divider,
  Typography,
  Stack,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

import { TemplateTextStyles } from "@shared/models/template";
import { Button } from "./styles";

import FormatColorTextIcon from "@mui/icons-material/FormatColorText";
import { useEffect } from "react";

interface Props {
  color: TemplateTextStyles["color"];
  shadowColor: TemplateTextStyles["shadowColor"];
  onChange: (
    color: TemplateTextStyles["color"],
    shadowColor: TemplateTextStyles["shadowColor"]
  ) => void;
}

const FontColorButton = ({ onChange, color, shadowColor }: Props) => {
  const [isShadow, setIsShadow] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl((event as any).currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleShadowCheckboxClick = (checked: boolean) => {
    setIsShadow(checked);
    if (checked) {
      onChange(color, shadowColor);
    } else {
      onChange(color, "transparent");
    }
  };

  useEffect(() => {
    if (shadowColor && shadowColor !== "transparent") {
      setIsShadow(true);
    }
  }, [shadowColor]);

  return (
    <>
      <Button onClick={handleClick}>
        <FormatColorTextIcon />
      </Button>
      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Stack width={150} sx={{ p: 1 }}>
          <Box>
            <Typography>Font color</Typography>
            <input
              type="color"
              value={color}
              onChange={(e) => onChange(e.target.value, shadowColor)}
            />
          </Box>
          <Divider sx={{ my: 1 }} />
          <Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isShadow}
                  onChange={() => handleShadowCheckboxClick(!isShadow)}
                />
              }
              label="Shadow color"
            />

            <input
              type="color"
              value={shadowColor}
              onChange={(e) => onChange(color, e.target.value)}
            />
          </Box>
        </Stack>
      </Popover>
    </>
  );
};

export default FontColorButton;
