import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { withStyles } from '@material-ui/core';

import ChatHistory from './List';
import ChatInput from './Form';

const styles = theme => ({
  history: {
    flex: 1,
  },
});

class ChatRoom extends React.Component {
  state = {
    history: this.props.history,
  };

  onSend = message => {
    const id = shortid.generate();
    let newMessage = {
      id,
      author: this.props.user.id,
      createdAt: new Date(),
      ...message,
    };
    this.setState(prevState => ({
      history: [...prevState.history, newMessage],
    }));
  };

  render() {
    const { history } = this.state;
    const { classes, disk } = this.props;

    return (
      <React.Fragment>
        <ChatHistory className={classes.history} messages={history} />

        <ChatInput
          disk={disk}
          className={classes.msgInput}
          onSend={this.onSend}
        />
      </React.Fragment>
    );
  }
}

ChatRoom.propTypes = {
  /** arrray of user messages */
  history: PropTypes.array,
};

ChatRoom.defaultProps = {
  history: [],
};

export default withStyles(styles)(ChatRoom);
