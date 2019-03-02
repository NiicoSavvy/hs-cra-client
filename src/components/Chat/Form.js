import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  withStyles,
  Paper,
  InputBase,
  IconButton,
  Typography,
  Divider,
} from '@material-ui/core';
import EmojiIcon from '@material-ui/icons/SentimentSatisfied';
import UploadIcon from '@material-ui/icons/SaveAlt';
import SendIcon from '@material-ui/icons/Send';

const styles = theme => ({
  paper: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    margin: 2 * theme.spacing.unit,
    marginTop: 0,
  },
  input: {
    marginLeft: theme.spacing.unit / 2,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
  typing: {
    position: 'absolute',
    bottom: 0,
    margin: `0 ${2 * theme.spacing.unit}px`,
    fontSize: 10,
  },
});

const UploadButton = ({ ...rest }) => (
  <IconButton aria-label="Upload" {...rest}>
    <UploadIcon />
  </IconButton>
);

const EmojiButton = ({ ...rest }) => (
  <IconButton aria-label="Add Emo" {...rest}>
    <EmojiIcon />
  </IconButton>
);

class Chatbox extends React.Component {
  state = {
    message: {
      body: '',
    },
    error: {},
  };

  handleChange = e => {
    const message = this.state.message;
    message[e.target.name] = e.target.value;
    this.setState({ message });
  };

  handleKeyPress = e => {
    if (e.keyCode === 13 || e.key === 'Enter') {
      this.handleSubmit();
    }
  };

  handleSubmit = () => {
    const { message } = this.state;
    //const formIsValid = this.validate(message);
    //if (formIsValid) {
    this.props.onSend(message);
    //message.body = "";
    //this.setState({ message });
    //}
  };

  render() {
    const { classes, disk, typing } = this.props;
    const { body } = this.state.message;

    return (
      <div className={classes.root}>
        <Paper className={classes.paper} elevation={1}>
          <UploadButton className={classes.iconButton} />

          <InputBase
            className={classes.input}
            placeholder={`Message ${disk.name}`}
            name="body"
            value={body}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyPress}
          />

          <EmojiButton className={classes.iconButton} />

          <Divider className={classes.divider} />
          <IconButton
            color="primary"
            className={classes.iconButton}
            aria-label="Send"
            onClick={this.handleSubmit}
          >
            <SendIcon style={{ transform: 'rotate(-45deg)' }} />
          </IconButton>
        </Paper>

        <Typography className={classes.typing}>{typing}</Typography>
      </div>
    );
  }
}

Chatbox.propTypes = {
  /** Styles */
  classes: PropTypes.object.isRequired,

  /** list of typing users */
  typing: PropTypes.string,
};

Chatbox.defaultProps = {
  typing: '',
};

export default withStyles(styles)(Chatbox);
