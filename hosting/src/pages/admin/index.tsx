import { Card, CardContent, Container } from "@mui/material";

import Tabs from "@components/admin/Tabs";

export default function AdminPage() {
  return (
    <Container>
      <Card>
        <CardContent>
          <Tabs />
        </CardContent>
      </Card>
    </Container>
  );
}
