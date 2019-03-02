import React from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  ListItemSecondaryAction,
} from '@material-ui/core';
import CheveronDown from '@material-ui/icons/ExpandMore';
import ChevronRight from '@material-ui/icons/ChevronRight';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import ArrowRight from '@material-ui/icons/ArrowRight';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import AddIcon from '@material-ui/icons/Add';

import Presence from './Collapse';

const styles = theme => ({
  list: {
    padding: 0,
  },
  listItem: {
    color: '#999',
    paddingLeft: theme.spacing.unit * 4, // nested
    '&:hover': {
      color: theme.palette.common.white,
      boxShadow: `inset 5px 0 0 0 ${theme.palette.primary.main}`,
      /* For browsers that do not support gradients */
      background: '#424242',
      background: `linear-gradient(
				to right,
				rgba(66, 66, 66, 1),
				rgba(66, 66, 66, 0)
			)`,
      '& $action': {
        visibility: 'visible !important',
      },
    },
  },
  selected: {
    color: theme.palette.common.white,
    boxShadow: `inset 5px 0 0 0 ${theme.palette.primary.main}`,
    /* For browsers that do not support gradients */
    background: '#424242',
    background: `linear-gradient(
				to right,
				rgba(66, 66, 66, 1),
				rgba(66, 66, 66, 0)
			) !important`,
    '&:after': {
      content: '""',
      display: 'block',
      border: '20px solid transparent',
      borderRightColor: `rgba(200, 200, 200, 0.1)`,
      position: 'absolute',
      bottom: 0,
      right: 0,
    },
    '& $action': {
      visibility: 'visible !important',
    },
  },
  action: {
    visibility: 'hidden',
  },
  collapseIcon: {
    margin: 0,
    padding: 0,
    color: theme.palette.text.primary,
  },
  disk: {
    fontFamily: theme.typography.fontFamily,
    fontSize: 14,
    paddingLeft: theme.spacing.unit / 4,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    minWidth: 0,
    marginRight: 24,
  },
  truncate: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    minWidth: 0,
  },
  hashtag: {
    width: 24,
    textAlign: 'center',
  },
});

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

class NestedList extends React.Component {
  state = {
    open: true,
    expand: Array(this.props.disks.length).fill(false),
  };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  togglePresence = (e, i) => {
    e.preventDefault();
    const expand = [...this.state.expand];
    let item = { ...expand[i] };
    item = !expand[i];
    expand[i] = item;
    this.setState({ expand });
  };

  render() {
    const { open, expand } = this.state;
    const { classes, type, disks, disk, presence } = this.props;

    return (
      <List disablePadding>
        <ListItem button onClick={this.handleClick}>
          <ListItemIcon className={classes.collapseIcon}>
            {open ? <CheveronDown /> : <ChevronRight />}
          </ListItemIcon>
          <ListItemText
            primary={`${type} Disks`}
            primaryTypographyProps={{
              variant: 'overline',
            }}
          />
          <ListItemSecondaryAction>
            <IconButton aria-label={`Add ${type} Disk`} color="inherit">
              <AddIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="nav" className={classes.list}>
            {disks.map(({ id, name, deck }, i) => (
              <React.Fragment key={id}>
                <ListItemLink
                  key={id}
                  href={`/d/${deck}/${id}`}
                  className={classes.listItem}
                  selected={id === disk.id}
                  classes={{ selected: classes.selected }}
                >
                  {type === 'TEXT' ? (
                    <span className={classes.hashtag}>#</span>
                  ) : (
                    <IconButton
                      onClick={e => this.togglePresence(e, i)}
                      className={classes.collapseIcon}
                    >
                      {expand[i] ? <ArrowDropDown /> : <ArrowRight />}
                    </IconButton>
                  )}

                  <span className={classes.disk}>{name}</span>

                  <div className={classes.action}>
                    <ListItemSecondaryAction>
                      <IconButton aria-label="Settings" color="inherit">
                        <SettingsIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </div>
                </ListItemLink>

                {presence && (
                  <Presence
                    open={expand[i]}
                    presence={presence.find(x => x.disk === id)}
                  />
                )}
              </React.Fragment>
            ))}
          </List>
        </Collapse>
      </List>
    );
  }
}

NestedList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NestedList);

/*
<List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText inset primary="Starred" />
            </ListItem>
          </List>
*/
