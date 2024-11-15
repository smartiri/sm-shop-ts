import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "../context/CartContext";

const Layout = () => {
  const { cart } = useCart();
  const [open, setOpen] = useState<boolean>(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const items = [
    { text: "Home", icon: <HomeIcon />, path: "/" },
    { text: "Shopping Cart", icon: <ShoppingCartIcon />, path: "/checkout" },
  ];
  const DrawerList = (
    <Box
      sx={{
        width: 250,
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List>
        {items.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={Link} to={item.path}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
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
            <a href="/checkout">
              <p>Cart Items: {cart.length}</p>
            </a>
          </a>
        </div>
      </div>
      <div>
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
        >
          <Outlet />
        </Box>
      </div>
    </>
  );
};

export default Layout;
