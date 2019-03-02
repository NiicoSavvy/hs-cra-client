import React from "react";
import { withStyles } from "@material-ui/core";

import Chatroom from "../components/Chat/Room";
import { Layout } from "../components/Layouts";
import { disks, users, messages } from "../store";

const styles = theme => ({});

/** Public Chat Page */
class SubSpace extends React.Component {
  state = {};

  render() {
    const { classes } = this.props;

    return (
      <Layout users={users}>
        <Chatroom disk={disks[0]} user={users[0]} history={messages} />
      </Layout>
    );
  }
}

export default withStyles(styles)(SubSpace);
