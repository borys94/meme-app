import { useState } from "react";
import { Popover } from "@mui/material";

import { TemplateTextStyles } from "@shared/models/template";
import { Button } from "./styles";

import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";

interface Props {
  textAlign: TemplateTextStyles["textAlign"];
  onChange: (textAlign: TemplateTextStyles["textAlign"]) => void;
}

const TextAlignButton = ({ onChange, textAlign }: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl((event as any).currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button onClick={handleClick} sx={{ textAlign }}>
        {textAlign === "left" && <FormatAlignLeftIcon />}
        {textAlign === "center" && <FormatAlignCenterIcon />}
        {textAlign === "right" && <FormatAlignRightIcon />}
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
        <Button onClick={() => onChange("left")}>
          <FormatAlignLeftIcon />
        </Button>
        <Button onClick={() => onChange("center")}>
          <FormatAlignCenterIcon />
        </Button>
        <Button onClick={() => onChange("right")}>
          <FormatAlignRightIcon />
        </Button>
      </Popover>
    </>
  );
};

export default TextAlignButton;
