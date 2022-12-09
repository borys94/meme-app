import Image from "next/image";
import { Card, CardContent, Container, Stack, IconButton } from "@mui/material";

import TextFieldsIcon from "@mui/icons-material/TextFields";
import EditIcon from "@mui/icons-material/Edit";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";

import Tabs from "@components/Tabs";

export default function IndexPage() {
  return (
    <Container>
      <Card>
        <CardContent>
          <Stack>
            <Tabs />
            <Stack direction="row" gap={2}>
              <Image src="/example.jpeg" alt="meme" width="512" height="512" />
              <Stack gap={1} alignItems="baseline">
                <IconButton>
                  <TextFieldsIcon />
                </IconButton>
                <IconButton>
                  <EditIcon />
                </IconButton>
                <Stack gap={1} direction="row">
                  <IconButton>
                    <UndoIcon />
                  </IconButton>
                  <IconButton disabled>
                    <RedoIcon />
                  </IconButton>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}
