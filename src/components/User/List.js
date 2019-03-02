import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
} from '@material-ui/core';
import OwnerIcon from '@material-ui/icons/ViewHeadline';
import amber from '@material-ui/core/colors/amber';
import Avatar from '../UI/Avatar';
import { hexToRGB } from '../../utils/colors';

const styles = theme => ({
  list: {
    flex: 1,
    position: 'relative',
    overflowY: 'auto',
    padding: 0,
  },
  label: {
    color: theme.palette.common.white,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    minWidth: 0,
    //background: 'rgba(17,17,17, 0.8)',
  },
  overline: {
    fontSize: '0.75rem',
    fontWeight: 400,
    lineHeight: 2.66,
    letterSpacing: '0.08333em',
    textTransform: 'uppercase',
  },
  ul: {
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
  },
  listItem: {
    paddingLeft: 3 * theme.spacing.unit,
    paddingRight: 3 * theme.spacing.unit,
    '&:hover ': {
      /* For browsers that do not support gradients */
      background: theme.palette.common.black,
      background: `linear-gradient(to right, ${
        theme.palette.common.black
      }, ${hexToRGB(theme.palette.common.black, 0)})`,
    },
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    margin: 0,
    cursor: 'pointer',
  },
  on_deck: {
    filter: 'none',
  },
  offline: {
    filter: 'grayscale(100%)',
    '&:hover ': {
      filter: 'none',
    },
  },
  captainStripes: {
    color: amber[700],
    fontSize: 18,
  },
});

const online = [
  { label: 'On Deck', online: true },
  { label: 'Offline', online: false },
];

function UserList(props) {
  const { classes, list, captain, collapsed } = props;

  return (
    <List dense className={classes.list}>
      {online.map(({ label, online }) => (
        <li key={label}>
          <ul className={classes.ul}>
            <ListSubheader
              className={classNames(classes.label, classes.overline)}
            >
              {label}
            </ListSubheader>
            {list
              .filter(u => (u.online && u.status !== 'HIDE') === online)
              .map(({ id, avatar, username, online, status }) => (
                <ListItem key={id} className={classes.listItem}>
                  <ListItemAvatar>
                    <Avatar
                      className={classNames(
                        classes.avatar,
                        (status === 'HIDE' || !online) && classes.offline
                      )}
                      imgUrl={avatar}
                      name={username}
                      indicator={{ online, status }}
                    />
                  </ListItemAvatar>
                  {!collapsed && (
                    <ListItemText
                      primary={
                        <span>
                          {username}{' '}
                          {id === captain && (
                            <OwnerIcon className={classes.captainStripes} />
                          )}
                        </span>
                      }
                      classes={{ primary: classes.label }}
                    />
                  )}
                </ListItem>
              ))}
          </ul>
        </li>
      ))}
    </List>
  );
}

UserList.propTypes = {
  /** Styling */
  classes: PropTypes.object.isRequired,

  /** List of users to loop through */
  users: PropTypes.array,
};

UserList.propTypes = {
  users: [],
};

export default withStyles(styles)(UserList);
