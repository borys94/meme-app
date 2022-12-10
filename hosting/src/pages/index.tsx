import { Card, CardContent, Container, Stack } from "@mui/material";

import Tabs from "@components/Tabs";

export default function IndexPage() {
  return (
    <Container>
      <Card>
        <CardContent>
          <Stack>
            <Tabs />
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}
