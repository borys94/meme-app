import { Card, CardContent, Container } from "@mui/material";

import Tabs from "@components/common/Tabs";

import UsersTable from "@components/admin/UsersTable";
import TemplatesList from "@components/admin/TemplatesList";

export default function AdminPage() {
  return (
    <Container>
      <Card>
        <CardContent>
          <Tabs
            items={[
              {
                label: "Users",
                render: () => <UsersTable />,
              },
              {
                label: "Templates",
                render: () => <TemplatesList />,
              },
            ]}
          />
        </CardContent>
      </Card>
    </Container>
  );
}
