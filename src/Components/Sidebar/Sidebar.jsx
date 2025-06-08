import React from "react";
import { Link } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import Inventory2Icon from "@mui/icons-material/Inventory2";

const drawerWidth = 220;

function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#f5f5f5",
          borderRight: "none",
        },
      }}
    >
      <Box sx={{ width: drawerWidth }}>
        <Typography
          variant="h5"
          sx={{ color: "#60AC4A", fontWeight: 700, pl: 2, pt: 2, pb: 1 }}
        >
          Fertilizer
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ color: "#60AC4A", fontWeight: 500, pl: 2, pb: 1 }}
        >
          Dashboard
        </Typography>
        <List>
          
          <Link to="/product" style={{ textDecoration: "none", color: "inherit" }}>
            <ListItem button>
              <ListItemIcon>
                <Inventory2Icon sx={{ color: "#60AC4A" }} />
              </ListItemIcon>
              <ListItemText primary="Products" />
            </ListItem>
          </Link>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <ListItem button>
              <ListItemIcon>
                <TrendingUpIcon sx={{ color: "#60AC4A" }} />
              </ListItemIcon>
              <ListItemText primary="Analytics" />
            </ListItem>
          </Link>
          
        </List>
      </Box>
    </Drawer>
  );
}

export default Sidebar;
