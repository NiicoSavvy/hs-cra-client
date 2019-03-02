import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';

const WIDTH = 240; // this.props.width
const FIXED = 80; // this.props.fixed

const styles = theme => /*console.log(theme) ||*/ ({
  root: {
    flexBasis: WIDTH,
    flexShrink: 0,
    color: theme.palette.common.white,
    overflow: 'hidden',
    height: '100%',
    maxHeight: '100vh',
  },
  horizontal: {
    display: 'flex',
    flexDirection: 'row',
  },
  vertical: {
    display: 'flex',
    flexDirection: 'column',
  },
  flex: {
    flex: 1,
    flexGrow: 1,
  },
  fixed: {
    maxWidth: FIXED,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  collapsed: {
    maxWidth: FIXED,
    // transition: theme.transitions.create(['margin', 'width'], {
    //   easing: theme.transitions.easing.sharp,
    //   duration: theme.transitions.duration.leavingScreen,
    // }),
  },
  minZeroWidth: {
    maxWidth: 0,
    display: 'none',
    // transition: theme.transitions.create(['margin', 'width'], {
    //   easing: theme.transitions.easing.sharp,
    //   duration: theme.transitions.duration.leavingScreen,
    // }),
  },
});

class Partition extends React.Component {
  state = {
    collapsed: this.props.collapsed || false,
  };

  toggleCollapse = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  render() {
    const {
      bg,
      classes,
      container,
      collapsed,
      fixed,
      horizontal,
      minZeroWidth,
      stretch,
      vertical,
      className,
    } = this.props;

    return (
      <div
        className={classNames(
          classes.root,
          container && classes.container,
          collapsed && classes.collapsed,
          fixed && classes.fixed,
          horizontal && classes.horizontal,
          minZeroWidth && collapsed && classes.minZeroWidth,
          stretch && classes.flex,
          vertical && classes.vertical,
          className
        )}
        style={{ background: bg }}
      >
        {this.props.children}
      </div>
    );
  }
}

Partition.propTypes = {
  /** styling */
  classes: PropTypes.object.isRequired,

  /** Part width */
  width: PropTypes.string,

  /** Part height */
  height: PropTypes.string,

  /** Is the Part collapsed */
  collapsed: PropTypes.bool,

  /** Is the Part !collapsible */
  fixed: PropTypes.bool,
};

Partition.defaultProps = {
  width: WIDTH,
  height: '100%',
  collapsed: false,
  fixed: false,
};

export default withStyles(styles)(Partition);
