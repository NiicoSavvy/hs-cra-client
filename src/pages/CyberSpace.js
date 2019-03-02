import React from "react";
import { withStyles } from "@material-ui/core";

import { Layout } from "../components/Layouts";
import { disks, users, messages } from "../store";

const styles = theme => ({});

class EncryptedChatPage extends React.Component {
  state = {};

  render() {
    const { classes } = this.props;

    return (
      <Layout users={users} rightCollapsed encrypted>
        EncryptedChat
      </Layout>
    );
  }
}

export default withStyles(styles)(EncryptedChatPage);
