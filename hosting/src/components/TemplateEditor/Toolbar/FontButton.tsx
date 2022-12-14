import { useState } from "react";
import { Popover, List, ListItem, ListItemButton } from "@mui/material";

import { TemplateTextStyles } from "@shared/models/template";
import { FontButton as Button } from "./styles";

const FONTS = ["Arial", "Impact", "Verdana", "Comic Sans MS", "Courier"];

interface Props {
  fontFamily: TemplateTextStyles["fontFamily"];
  onChange: (fontFamily: TemplateTextStyles["fontFamily"]) => void;
}

const FontButton = ({ onChange, fontFamily }: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl((event as any).currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button onClick={handleClick} sx={{ fontFamily }}>
        {fontFamily}
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
        <List>
          {FONTS.map((font) => (
            <ListItem selected={font === fontFamily} disablePadding key={font}>
              <ListItemButton
                sx={{ fontFamily: font }}
                onClick={() => onChange(font)}
              >
                {font}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Popover>
    </>
  );
};

export default FontButton;
