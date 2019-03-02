import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import distanceInWords from 'date-fns/distance_in_words';
import {
  withStyles,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Typography,
} from '@material-ui/core';

import Avatar from '../UI/Avatar';
import { users } from '../../store';

const styles = theme => ({
  root: {
    margin: 2 * theme.spacing.unit,
    overflowY: 'auto',
  },
  inline: {
    display: 'inline',
  },
  text: {
    color: 'white',
  },
});

function ChatHistory(props) {
  const { classes, messages, className } = props;

  return (
    <List dense className={classNames(classes.root, className)}>
      <Typography>Welcome!</Typography>
      {messages.map(({ id, body, author, createdAt, updatedAt }) => (
        <ListItem key={id} alignItems="flex-start">
          <ListItemAvatar>
            <Avatar imgUrl={author.avatar} name={users[author].username} />
          </ListItemAvatar>

          <ListItemText
            primary={distanceInWords(createdAt, new Date())}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  className={classes.inline}
                  color="textPrimary"
                >
                  {users[author].username}
                </Typography>
                <span className={classes.text}>{` — ${body}`}</span>
              </React.Fragment>
            }
          />
        </ListItem>
      ))}
    </List>
  );
}

ChatHistory.propTypes = {
  /** Styles */
  classes: PropTypes.object.isRequired,

  /** messages */
  messages: PropTypes.array,
};

ChatHistory.defaultProps = {
  messages: [],
};

export default withStyles(styles)(ChatHistory);
