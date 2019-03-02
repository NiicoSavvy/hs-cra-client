import React from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  IconButton,
  Typography,
  Menu,
  MenuItem,
} from '@material-ui/core';
import ExpandMore from '@material-ui/icons/ExpandMore';

const styles = theme => ({
  menuBtn: {
    marginRight: -18, //-12
  },
  truncate: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    minWidth: '0',
  },
});

/** displays the current selected deck */
class DeckDetails extends React.Component {
  state = {
    anchorEl: null,
  };

  handleMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const { classes, deck } = this.props;

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'center', horizontal: 'center' }}
        open={Boolean(anchorEl)}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMenuClose}>Generate Invitation</MenuItem>
        <MenuItem onClick={this.handleMenuClose}>Deck Settings</MenuItem>
      </Menu>
    );

    return (
      <React.Fragment>
        <Typography
          variant="subtitle1"
          color="inherit"
          className={classes.truncate}
        >
          {deck.name}
        </Typography>

        <IconButton
          color="inherit"
          aria-label="Menu"
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleMenuOpen}
          className={classes.menuBtn}
        >
          <ExpandMore />
        </IconButton>
        {renderMenu}
      </React.Fragment>
    );
  }
}
DeckDetails.propTypes = {
  /** Styling */
  classes: PropTypes.object.isRequired,

  deck: PropTypes.shape({
    name: PropTypes.string,
  }),
};

DeckDetails.defaultProps = {
  deck: {
    name: '',
  },
};

export default withStyles(styles)(DeckDetails);
