import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { UserModel } from "@shared/models/user";
import dateUtils from "@utils/dateUtils";
import MenuButton from "@components/MenuButton";
import { useCollectionData, QUERIES } from "@services/queries";

import EditUserDialog from "./EditUserDialog";

export default function UsersTable() {
  const [currentUser, setCurrentUser] = useState<UserModel | null>(null);
  const [isEditUserDialogOpen, setIsEditUserDialogOpen] = useState(false);
  const [users] = useCollectionData<UserModel>(QUERIES.GET_USERS);

  return (
    <>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Creation date</TableCell>
            <TableCell>More</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users?.map((user) => (
            <TableRow
              key={user.email}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {user.uid}
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{dateUtils.formatDate(user.createdAt)}</TableCell>
              <TableCell>
                <MenuButton
                  label="More"
                  items={[
                    {
                      label: "Edit",
                      onClick: () => {
                        setIsEditUserDialogOpen(true);
                        setCurrentUser(user);
                      },
                    },
                  ]}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <EditUserDialog
        open={isEditUserDialogOpen}
        handleClose={() => setIsEditUserDialogOpen(false)}
        user={currentUser}
      />
    </>
  );
}
