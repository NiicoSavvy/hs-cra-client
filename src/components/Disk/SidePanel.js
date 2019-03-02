import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Toolbar } from '@material-ui/core';

import Partition from '../UI/Partition';
import DeckDetails from '../Deck/Details';
import Disks from './List';

const styles = theme => ({
  // toolbar: theme.mixins.toolbar
  layout: {
    background: theme.palette.grey.A400,
    justifyContent: 'space-between',
  },
});

/** displays:
 * current deck the disks belongs to
 * all the disks of the current deck
 * users of VoIP and Holo disk
 * */
function DiskPanel(props) {
  const { classes, color, deck, disk, disks, presence, collapsed } = props;
  return (
    <Partition vertical minZeroWidth bg={color} collapsed={collapsed}>
      <Toolbar className={classes.layout}>
        <DeckDetails deck={deck} />
      </Toolbar>
      <Disks disks={disks} disk={disk} presence={presence} />
    </Partition>
  );
}

DiskPanel.propTypes = {
  /** Styling */
  classes: PropTypes.object.isRequired,

  /** controls the background color */
  color: PropTypes.string,

  /** list of member disks */
  disks: PropTypes.array,
};

DiskPanel.defaultProps = {
  color: 'transparent',
  disks: [],
};

export default withStyles(styles)(DiskPanel);
