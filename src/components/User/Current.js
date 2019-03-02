import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  withStyles,
  IconButton,
  Menu,
  MenuItem,
  ListItemText,
  ListItemIcon,
  ButtonBase,
  Popover,
} from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import ExpandLess from '@material-ui/icons/ExpandLess';
import Details from '@material-ui/icons/Details';
import StatusIcon from '@material-ui/icons/FiberManualRecord';
import MicIcon from '@material-ui/icons/Mic';
import SpeakerIcon from '@material-ui/icons/Speaker';
import VrIcon from '@material-ui/icons/VideogameAsset';
import CallIcon from '@material-ui/icons/Call';

import Avatar from '../UI/Avatar';
import DetailsModal from './Details';

const styles = theme => ({
  avatar: {
    cursor: 'pointer',
    '&:hover': {
      opacity: 0.8,
    },
  },
  btn: {
    padding: theme.spacing.unit / 2,
  },
  layout: {
    fontFamily: theme.typography.fontFamily,
    display: 'flex',
    alignItems: 'center',
    //overflow: 'hidden',
  },
  truncate: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    minWidth: 0,
  },
  pin: {
    letterSpacing: 0.8,
    fontSize: theme.typography.fontSize - 4,
    color: theme.palette.grey[500],
  },
  text: {
    marginLeft: theme.spacing.unit,
    paddingTop: theme.typography.fontSize / 2, // marginTop: 'auto',
    lineHeight: 0.8,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    minWidth: 0,
  },
  hide: {
    display: 'none',
    margin: 0,
  },
  flip: {
    transform: 'rotate(180deg)',
  },
  grouped: {
    whiteSpace: 'nowrap',
  },
  collapsed: {
    position: 'absolute',
    left: '50%',
    marginLeft: -20,
  },
  toggleContainer: {
    height: 56,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: `${theme.spacing.unit}px 0`,
    background: theme.palette.background.default,
  },
});

/** displays the loggedin User */
class CurrentUser extends React.Component {
  state = {
    anchorEl: null,
    settings: ['speaker'],
    activeStatus: this.props.user.status,
    onlineStatus: [
      { name: 'SHOW', color: 'teal' },
      { name: 'AWAY', color: 'yellow' },
      { name: 'BUSY', color: 'red', desc: 'Do NOT Disturb' },
      { name: 'HIDE', color: 'grey', desc: 'You ARE Invisible' },
    ],
    voipOptions: [
      { value: 'mic', icon: <MicIcon /> },
      { value: 'speaker', icon: <SpeakerIcon /> },
      { value: 'vr', icon: <VrIcon /> },
      { value: 'call', icon: <CallIcon /> },
    ],
    open: false,
    popOpen: false,
    popoverAnchorEl: null,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  togglePopover = e => {
    this.setState({ popoverAnchorEl: e.currentTarget });
    this.setState({ popOpen: !this.state.popOpen });
  };

  handleStatusClick = (event, activeStatus) =>
    this.setState({ activeStatus }, () => {
      this.handleMenuClose();
      // toast: `status updated to ${activeStatus} online`
    });

  handleMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  handleSave = details => {
    this.handleClose();
  };

  toggleSetting = (event, settings) => this.setState({ settings });

  render() {
    const {
      anchorEl,
      settings,
      onlineStatus,
      voipOptions,
      open,
      popoverAnchorEl,
    } = this.state;
    const { classes, user, collapsed } = this.props;
    const { avatar, username, pin, online, status } = user;

    const renderVoIPSettings = (
      <div className={classes.toggleContainer}>
        <ToggleButtonGroup value={settings} onChange={this.toggleSetting}>
          {voipOptions.map(({ value, icon }, i) => (
            <ToggleButton key={i} value={value}>
              {icon}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </div>
    );

    // user status menu and if collapsed voip popover and details modal
    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        transformOrigin={{ vertical: 'center', horizontal: 'center' }}
        open={Boolean(anchorEl)}
        onClose={this.handleMenuClose}
      >
        {onlineStatus.map(({ name, color, desc }, i) => (
          <MenuItem
            key={i}
            selected={name === this.state.activeStatus}
            onClick={e => this.handleStatusClick(e, name)}
          >
            <ListItemIcon>
              <StatusIcon style={{ color: color }} />
            </ListItemIcon>
            <ListItemText primary={name} secondary={desc} />
          </MenuItem>
        ))}
        {collapsed && (
          <div>
            <MenuItem>{renderVoIPSettings}</MenuItem>
            <MenuItem onClick={this.handleMenuClose}>
              <ListItemIcon>
                <Details />
              </ListItemIcon>
              <ListItemText primary="Details &amp; Settings" />
            </MenuItem>
          </div>
        )}
      </Menu>
    );

    const renderPopover = (
      <Popover
        anchorEl={popoverAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        transformOrigin={{ vertical: 'center', horizontal: 'center' }}
        open={this.state.popOpen}
        onClose={this.togglePopover}
      >
        {renderVoIPSettings}
      </Popover>
    );

    return (
      <React.Fragment>
        <div
          className={classNames(classes.layout, collapsed && classes.collapsed)}
        >
          <ButtonBase
            aria-label="Menu"
            aria-owns={anchorEl ? 'simple-menu' : undefined}
            aria-haspopup="true"
            onClick={this.handleMenuOpen}
            style={{ borderRadius: '50%' }}
          >
            <Avatar
              className={classes.avatar}
              imgUrl={avatar}
              name={username}
              indicator={{ online, status }}
            />
          </ButtonBase>
          {renderMenu}

          <span className={classNames(classes.text, collapsed && classes.hide)}>
            {username} <br />
            <span className={classes.pin}>#{pin}</span>
          </span>
        </div>

        <div className={classNames(classes.grouped, collapsed && classes.hide)}>
          <IconButton
            color="inherit"
            aria-label="Popover"
            aria-owns={open ? 'simple-popper' : undefined}
            aria-haspopup="true"
            onClick={this.togglePopover}
            className={classes.btn}
          >
            <ExpandLess />
          </IconButton>
          {renderPopover}

          <IconButton
            color="inherit"
            aria-label="User Profile Modal"
            className={classes.btn}
            onClick={this.handleClickOpen}
          >
            <Details />
          </IconButton>
          <DetailsModal
            open={open}
            onClose={this.handleClose}
            onSave={this.handleSave}
            user={user}
          />
        </div>
      </React.Fragment>
    );
  }
}

CurrentUser.propTypes = {
  /** Styling */
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CurrentUser);
