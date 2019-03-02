import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, Toolbar, IconButton, Typography } from '@material-ui/core';
import Collapse from '@material-ui/icons/FormatIndentIncrease';

import Partition from '../UI/Partition';
import Users from './List';
import User from './Current';

const styles = theme => ({
  // toolbar: theme.mixins.toolbar
  menuBtn: {
    marginLeft: -12,
  },
  title: {
    [theme.breakpoints.down('md')]: {
      //marginTop: 64,
    },
  },
  truncate: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    minWidth: '0',
  },
  flip: {
    transform: 'rotate(180deg)',
  },
  user: {
    background: theme.palette.grey[900],
    justifyContent: 'space-between',
  },
  hidden: {
    display: 'none',
  },
  collapsed: {
    position: 'absolute',
    left: '50%',
    marginLeft: -24,
  },
});

/** displays:
 * type of users listed: (members/friends)
 * all the users of the current deck / or user's friends
 * the currently logged in user
 * */
function MetaPanel(props) {
  const { classes, color, user, users, deck, trigger, collapsed } = props;
  return (
    <Partition vertical bg={color} collapsed={collapsed}>
      <Toolbar className={classes.title}>
        <IconButton
          color="inherit"
          aria-label="Collapse"
          onClick={trigger}
          className={classNames(
            classes.menuBtn,
            collapsed && classes.collapsed
          )}
        >
          <Collapse className={collapsed && classes.flip} />
        </IconButton>
        <Typography
          variant="subtitle1"
          color="inherit"
          className={classNames(classes.truncate, collapsed && classes.hidden)}
        >
          {props.type}
        </Typography>
      </Toolbar>

      <Users list={users} collapsed={collapsed} captain={deck.owner} />

      <Toolbar className={classes.user}>
        <User user={user} collapsed={collapsed} />
      </Toolbar>
    </Partition>
  );
}

MetaPanel.propTypes = {
  /** Styling */
  classes: PropTypes.object.isRequired,

  /** controls the background color */
  color: PropTypes.string,

  /** list of member users */
  users: PropTypes.array,

  deck: PropTypes.object,
};

MetaPanel.defaultProps = {
  color: 'transparent',
  users: [],
  deck: {},
};

export default withStyles(styles)(MetaPanel);
