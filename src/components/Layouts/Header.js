import React from "react";
import { AppBar, Toolbar, Button, Typography } from "@material-ui/core/";

export default props => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h5" color="inherit">
        HoloSpace
      </Typography>
      <Button color="inherit">Login</Button>
    </Toolbar>
  </AppBar>
);
