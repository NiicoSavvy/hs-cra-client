import React from "react";
import { withStyles } from "@material-ui/core";

import { Layout } from "../components/Layouts";
import { disks, users, messages } from "../store";

const styles = theme => ({});

class ProfilePage extends React.Component {
  state = {};

  render() {
    const { classes } = this.props;

    return (
      <Layout userType="Friends" users={users}>
        Profile
      </Layout>
    );
  }
}

export default withStyles(styles)(ProfilePage);
