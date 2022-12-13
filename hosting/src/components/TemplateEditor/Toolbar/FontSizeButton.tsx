import { useState } from "react";
import { Popover } from "@mui/material";

import { TemplateTextStyles } from "@shared/models/template";
import { Button } from "./styles";

interface Props {
  fontSize: TemplateTextStyles["fontSize"];
  onChange: (fontSize: TemplateTextStyles["fontSize"]) => void;
}

const FontSizeButton = ({ onChange, fontSize }: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl((event as any).currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button onClick={handleClick} sx={{ fontSize: 18 }}>
        {fontSize}
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
        <input
          style={{ margin: 20, width: 70, padding: 5 }}
          type="number"
          value={fontSize}
          onChange={(e) => onChange(+e.target.value as unknown as number)}
        />
      </Popover>
    </>
  );
};

export default FontSizeButton;
