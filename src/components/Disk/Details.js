import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, IconButton, Typography } from '@material-ui/core';
import Collapse from '@material-ui/icons/FormatIndentDecrease';
import Calendar from '@material-ui/icons/DateRange';
import Notifications from '@material-ui/icons/NotificationsNone';
import Search from '@material-ui/icons/Search';
import MoreHoriz from '@material-ui/icons/MoreHoriz';

const styles = theme => ({
  topic: {
    marginLeft: theme.spacing.unit,
    paddingLeft: theme.spacing.unit,
    borderLeft: `1px solid ${theme.palette.grey[500]}`,
    fontStyle: 'italic',
    color: theme.palette.grey[500],
  },
  truncate: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    minWidth: '0',
    flexGrow: 1,
  },
  btn: {
    padding: theme.spacing.unit / 2,
  },
  contextMenu: {
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
  btnGroup: {
    whiteSpace: 'nowrap',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  flip: {
    transform: 'rotate(180deg)',
  },
});

const iconBtns = [
  { label: 'Search', icon: <Search /> },
  { label: 'Notifications', icon: <Notifications /> },
  { label: 'Calendar', icon: <Calendar /> },
];
/** displays the current selected disk */
function DiskDetails({ classes, theme, disk, toggleCollapsed, collapsed }) {
  const { name, topic } = disk;
  return (
    <React.Fragment>
      <IconButton
        style={{ color: theme.palette.common.white, zIndex: 9 }}
        aria-label="Collapse"
        onClick={toggleCollapsed}
      >
        <Collapse className={collapsed && classes.flip} />
      </IconButton>
      <Typography variant="h6" color="textPrimary" className={classes.truncate}>
        {name}
        {topic && <span className={classes.topic}>{topic}</span>}
      </Typography>

      <IconButton
        color="inherit"
        aria-label="Context Menu"
        className={classes.contextMenu}
      >
        <MoreHoriz />
      </IconButton>

      <div className={classes.btnGroup}>
        {iconBtns.map(({ label, icon }) => (
          <IconButton
            color="inherit"
            aria-label={label}
            className={classes.btn}
          >
            {icon}
          </IconButton>
        ))}
      </div>
    </React.Fragment>
  );
}

DiskDetails.propTypes = {
  /** Styling */
  classes: PropTypes.object.isRequired,

  disk: PropTypes.object,
};

DiskDetails.defaultProps = {
  disk: {},
};

export default withStyles(styles, { withTheme: true })(DiskDetails);
