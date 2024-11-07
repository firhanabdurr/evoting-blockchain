import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

const Footer = () => (
  <>
    <AppBar 
      position="fixed" 
      component="footer" 
      color="default" 
      style={{ top: 'auto', bottom: 0 }}  // Ensures it sticks to the bottom
    >
      <Toolbar style={{ justifyContent: "center" }}>
        <Typography variant="caption">©evoting-blockchain</Typography>
      </Toolbar>
    </AppBar>
  </>
);

export default Footer;