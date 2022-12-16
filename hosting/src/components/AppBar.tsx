import { useState, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSignOut } from "react-firebase-hooks/auth";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";

import { AppContext } from "@components/AppContextProvider";
import { auth } from "../FirebaseConfig";

function ResponsiveAppBar() {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const [signOut] = useSignOut(auth);
  const { isAdmin, user } = useContext(AppContext);
  const router = useRouter();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSignOut = async () => {
    await signOut();
    handleCloseUserMenu();
    router.push("/login");
  };

  return (
    <AppBar position="static" sx={{ mb: 2 }}>
      <Container>
        <Toolbar disableGutters>
          <Link href="/" passHref>
            <img src="/logo.png" alt="me" width={165} />
          </Link>
          {user ? (
            <Box sx={{ flexGrow: 0, ml: "auto" }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Avatar" src={user?.avatar} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <Link href="/profile" passHref>
                  <MenuItem>
                    <Typography textAlign="center">Profile</Typography>
                  </MenuItem>
                </Link>
                {isAdmin && (
                  <Link href="/admin" passHref>
                    <MenuItem>
                      <Typography textAlign="center">Admin</Typography>
                    </MenuItem>
                  </Link>
                )}
                <Divider />
                <MenuItem onClick={handleSignOut}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 0, ml: "auto" }}>
              <Link href="/login" passHref>
                <Button color="warning">Sign in</Button>
              </Link>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
