import "./App.css";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Typography from "@mui/material/Typography";
function App() {
  const [open, setOpen] = useState<boolean>(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  const DrawerList = (
    <Box
      sx={{
        width: 250,
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  return (
    <>
      <div
        style={{
          background: "linear-gradient(to right, #41295a, #2f0743)",
          padding: "1%",
          color: "white",
        }}
      >
        <Button onClick={toggleDrawer(true)}>
          <MenuIcon sx={{ color: "white" }} />
        </Button>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>
        <div
          style={{
            float: "right",
          }}
        >
          <a
            href="#"
            style={{
              display: "flex",
              marginTop: "-8.5%",
              alignItems: "center",
            }}
          >
            <ShoppingCartIcon />
            <p>Cart Items: 0</p>
          </a>
        </div>
      </div>
      <div>
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
        >
          <Typography variant="h4" gutterBottom>
            Main Content
          </Typography>
        </Box>
      </div>
    </>
  );
}

export default App;
