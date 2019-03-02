import React from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  List,
  ListItem,
  Typography,
  Tooltip,
} from '@material-ui/core';

import Avatar from '../UI/Avatar';

const styles = theme => ({
  list: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
    overflowX: 'hidden',
    overflowY: 'auto',
    [theme.breakpoints.down('xs')]: {
      flexFlow: 'row nowrap',
      flex: 1,
      justifyContent: 'center',
      overflowX: 'auto',
      overflowY: 'hidden',
    },
  },
  listItem: {
    display: 'inline-block',
    width: 'auto',
  },
  selected: {
    background: 'transparent !important',
    '& $avatar': {
      borderRadius: '10%',
      animation: 'none !important',
    },
  },
  avatar: {
    animationName: 'fix',
    animationTimingFunction: 'ease-in-out',
    animationDuration: '0.5s',
    '&:hover': {
      //borderRadius: theme.shape.borderRadius,
      borderRadius: '10%',
      animationName: 'borders',
      animationDuration: '0.5s',
      animationTimingFunction: 'ease-in-out',
    },
  },
  '@keyframes borders': {
    '0%': { borderRadius: '50%' },
    '33%': { borderRadius: '15%' },
    '66%': { borderRadius: '25%' },
    '100%': { borderRadius: '10%' },
  },
  '@keyframes fix': {
    from: { borderRadius: '10%' },
    to: { borderRadius: '50%' },
  },
});

function ListItemLink(props) {
  return <ListItem component="a" {...props} />;
}

// TODO: change tooltip placement="bottom" on [theme.breakpoints.down('xs')]
function DeckList(props) {
  const { classes, decks, deck } = props;
  return (
    <List dense className={classes.list}>
      <Typography>Decks</Typography>
      {decks.map(({ id, icon, name, disk }) => (
        <ListItemLink
          key={id}
          href={`/d/${id}/${disk}`}
          className={classes.listItem}
          selected={id === deck.id}
          classes={{ selected: classes.selected }}
        >
          <Tooltip title={name} placement="right">
            <Avatar className={classes.avatar} imgUrl={icon} name={name} />
          </Tooltip>
        </ListItemLink>
      ))}
    </List>
  );
}

DeckList.propTypes = {
  classes: PropTypes.object.isRequired,
  deck: PropTypes.object,
  disks: PropTypes.array,
};

DeckList.defaultProps = {
  deck: {},
  disks: [],
};

export default withStyles(styles)(DeckList);
