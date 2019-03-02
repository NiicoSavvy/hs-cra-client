import React from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Collapse,
} from '@material-ui/core';
import Avatar from '../UI/Avatar';

const styles = theme => ({
  root: {
    width: '100%',
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  collapseIcon: {
    margin: 0,
    color: theme.palette.text.primary,
  },
  avatar: {
    width: 24,
    height: 24,
  },
  listItem: {
    paddingLeft: theme.spacing.unit * 8,
  },
  truncate: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    minWidth: 0,
  },
});

class Presence extends React.Component {
  render() {
    const { classes, open, presence } = this.props;

    return (
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List dense component="div" disablePadding>
          {presence.users.map(({ id, avatar, username }) => (
            <ListItem key={id} className={classes.listItem}>
              <ListItemAvatar>
                <Avatar
                  className={classes.avatar}
                  imgUrl={avatar}
                  name={username}
                />
              </ListItemAvatar>
              <ListItemText
                primary={username}
                classes={{ primary: classes.truncate }}
                style={{ paddingLeft: 4 }}
              />
            </ListItem>
          ))}
        </List>
      </Collapse>
    );
  }
}

Presence.propTypes = {
  classes: PropTypes.object.isRequired,
};

Presence.defaultProps = {
  presence: { users: [] },
};

export default withStyles(styles)(Presence);
