import React from "react";
import { withStyles } from "@material-ui/core";

import { Layout } from "../components/Layouts";
import { disks, users, messages } from "../store";

const styles = theme => ({});

class HoloSpacePage extends React.Component {
  state = {};

  render() {
    const { classes } = this.props;

    return (
      <Layout users={users} leftCollapsed>
        HoloSpace
      </Layout>
    );
  }
}

export default withStyles(styles)(HoloSpacePage);
