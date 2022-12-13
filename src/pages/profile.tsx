import Card from "@mui/material/Card";
import { CardContent } from "@mui/material";

import Tabs from "@components/common/Tabs";
import Account from "@components/profile/Account";

const Profile = () => {
  return (
    <Card>
      <CardContent>
        <Tabs
          items={[
            {
              label: "Account",
              render: () => <Account />,
            },
            {
              label: "Security",
              render: () => <div />,
            },
          ]}
        />
      </CardContent>
    </Card>
  );
};

export default Profile;
