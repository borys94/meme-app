import { styled } from "@mui/material/styles";
import { keyframes } from "@emotion/react";

const fadeOnMount = keyframes`
0% {
  display: block;
  opacity: 0;
}

1% {
  display: block;
  opacity: 0;
}

100% {
  display: block;
  opacity: 1;
}
`;

const Fade = styled("div")({
  animation: `${fadeOnMount} 200ms`,
});

export default Fade;
