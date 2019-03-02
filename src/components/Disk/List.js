import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import NestedList from './NestedList';

const styles = theme => ({
  root: {
    height: '100%',
    position: 'relative',
    overflowY: 'auto',
  },
});

function DiskList(props) {
  const { classes, disks, disk, presence } = props;
  const tDisks = disks.filter(x => x.type === 'TEXT');
  const vDisks = disks.filter(x => x.type === 'VOIP');
  const hDisks = disks.filter(x => x.type === 'HOLO');

  return (
    <div className={classes.root}>
      <NestedList type="TEXT" disks={tDisks} disk={disk} />
      <NestedList type="VoIP" disks={vDisks} disk={disk} presence={presence} />
      <NestedList type="HOLO" disks={hDisks} disk={disk} presence={presence} />
    </div>
  );
}

DiskList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DiskList);

/*
<List component="nav" className={classes.root}>
      {disks.map(({ id, name, deck }) => (
        <ListItemLink
          key={id}
          href={`/d/${deck}/${id}`}
          className={classNames(classes.listItem)}
          selected={id === disk.id}
          classes={{ selected: classes.selected }}
        >
          {name}

          <div className={classes.action}>
            <ListItemSecondaryAction>
              <IconButton aria-label="Settings" color="inherit">
                <SettingsIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </div>
        </ListItemLink>
      ))}
    </List>
*/
