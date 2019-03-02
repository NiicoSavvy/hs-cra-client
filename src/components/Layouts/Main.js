import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, Grid, Toolbar } from '@material-ui/core';
//import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import Banner from '../UI/Banner';
import Partition from '../UI/Partition';
import DeckPanel from '../Deck/FixedPanel';
import DiskPanel from '../Disk/SidePanel';
import UserPanel from '../User/MetaPanel';
import DiskDetails from '../Disk/Details';
import { hexToRGB } from '../../utils/colors';
import { decks, disks, presence } from '../../store';

import LayoutBgImg from '../../assets/images/flat-mountains-1080p.jpg';

const ALPHA = 0.8;
const FIXED = 80;
const WIDTH = 240;

const styles = theme => ({
  root: {
    maxHeight: '100%',
    background: hexToRGB(theme.palette.grey[800], ALPHA),
  },
  layout: {
    background: `linear-gradient(
      90deg,
      ${hexToRGB('#ff4d4d', 0.6)} 10%,
      ${hexToRGB('#ff8183', 0.6)}
    ),
    url(${LayoutBgImg}) no-repeat`,
  },
  fixed: {
    width: FIXED,
    overflow: 'hidden',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      height: 64,
      maxHeight: 64,
    },
  },
  collapsible: {
    width: WIDTH,
    overflow: 'hidden',
    maxHeight: '100%',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  horizontal: {
    display: 'flex',
    flexDirection: 'row',
    height: '100vh',
  },
  vertical: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    [theme.breakpoints.down('xs')]: {
      height: 'calc(100vh - 64px)',
    },
  },
  toolBar: {
    background: theme.palette.grey[800],
    //position: 'fixed',
    right: 0,
  },
  collapsed: {
    width: FIXED,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  minZeroWidth: {
    width: 0,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
});

const mediaQuery = window.matchMedia('(min-width: 768px)');

class MainLayout extends React.Component {
  state = {
    leftCollapsed: this.props.leftCollapsed || false,
    rightCollapsed: this.props.rightCollapsed || false,
  };

  componentWillMount() {
    this.onWindowResize();
  }

  componentWillUnmount() {
    mediaQuery.removeListener();
  }

  onWindowResize = () => {
    if (mediaQuery.matches) {
      this.prevCollapse();
    } else {
      this.autoCollapse();
    }

    mediaQuery.addListener(mq => {
      if (mq.matches) {
        this.prevCollapse();
      } else {
        this.autoCollapse();
      }
    });
  };

  /** set collapse to prev state before auto collapse */
  prevCollapse = () => {
    this.setState({ leftCollapsed: false, rightCollapsed: false });
  };

  autoCollapse = () => {
    this.setState({ leftCollapsed: true, rightCollapsed: true });
  };

  toggleLeftPart = () => {
    this.setState({ leftCollapsed: !this.state.leftCollapsed });
  };

  toggleRightPart = () => {
    const mediaQuery = window.matchMedia('(max-width: 368px)');
    if (mediaQuery.matches) {
      this.setState({ rightCollapsed: true });
    } else {
      this.setState({ rightCollapsed: !this.state.rightCollapsed });
    }
  };

  render() {
    const { classes, users, match, encrypted } = this.props;
    const { common, grey } = this.props.theme.palette;
    const { leftCollapsed, rightCollapsed } = this.state;
    const deck = decks.find(x => x.id === match.params.deckId);
    const disk = disks.find(x => x.id === match.params.id);
    const deckDisks = disks.filter(x => x.deck === match.params.deckId);

    // const lte_xs = isWidthDown('xs', width);
    // const toolbarWidth = leftCollapsed
    //   ? !lte_xs
    //     ? FIXED
    //     : 0
    //   : WIDTH + (!lte_xs && FIXED);

    return (
      <Grid container className={classes.layout}>
        <Grid
          item
          className={classes.fixed}
          style={{ background: hexToRGB(common.black, ALPHA) }}
        >
          <DeckPanel decks={decks} deck={deck} enc={encrypted} />
        </Grid>
        <Grid item xs className={classes.vertical}>
          {true && <Banner>default</Banner>}

          <Grid container className={classes.horizontal}>
            <Grid
              item
              className={classNames(
                classes.collapsible,
                leftCollapsed && classes.minZeroWidth
              )}
              style={{ background: hexToRGB(grey.A400, ALPHA) }}
            >
              <DiskPanel
                deck={deck}
                disk={disk}
                disks={deckDisks}
                presence={presence}
                collapsed={leftCollapsed}
              />
            </Grid>

            <Grid item xs zeroMinWidth className={classes.root}>
              <Partition vertical>
                <Toolbar
                  className={classes.toolBar}
                  //style={{ width: `calc(100% - ${toolbarWidth}px)` }}
                >
                  <DiskDetails
                    disk={disk}
                    toggleCollapsed={this.toggleLeftPart}
                    collapsed={leftCollapsed}
                  />
                </Toolbar>
                {this.props.children}
              </Partition>
            </Grid>

            <Grid
              item
              className={classNames(
                classes.collapsible,
                rightCollapsed && classes.collapsed
              )}
              style={{ background: hexToRGB(grey[900], ALPHA) }}
            >
              <UserPanel
                deck={deck}
                user={users[0]}
                users={users}
                type="Crew"
                trigger={this.toggleRightPart}
                collapsed={rightCollapsed}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

MainLayout.propTypes = {
  /** Styling */
  classes: PropTypes.object.isRequired,

  /** user type: Crew or Friends */
  userType: PropTypes.string,

  /** list of users depends on the page */
  users: PropTypes.array,
};

MainLayout.defaultProps = {
  userType: 'Crew',
  users: [],
};

export default compose(
  withRouter,
  withStyles(styles, { withTheme: true })
)(MainLayout);

// <Layout>
//   <Partition container fixed bg={hexToRGB(common.black, ALPHA)}>
//     decks
//   </Partition>

//   <Partition stretch container>
//     {false && <Banner info>x</Banner>}

//     <Partition horizontal container>
//       <Partition
//         minZeroWidth
//         bg={hexToRGB(grey.A400, ALPHA)}
//         collapsed={leftCollapsed}
//       >
//         <AppBar bg={grey.A400}>
//           <Deck deck={decks[0]} />
//         </AppBar>
//         disks
//     </Partition>

//       <Partition stretch bg={hexToRGB(grey[800], ALPHA)}>
//         <AppBar bg={grey[800]}>
//           <Disk
//             disk={disks[0]}
//             toggleCollapsed={this.toggleLeftPart}
//             collapsed={leftCollapsed}
//           />
//         </AppBar>
//         messages
//       </Partition>

//       <Partition
//         vertical
//         container
//         bg={hexToRGB(grey[900], ALPHA)}
//         collapsed={rightCollapsed}
//       >
//         <AppBar
//           title={
//             <React.Fragment>
//               <IconButton
//                 color="inherit"
//                 aria-label="Collapse"
//                 onClick={this.toggleRightPart}
//               >
//                 <Collapse className={rightCollapsed && classes.flip} />
//               </IconButton>
//               <div className={classes.truncate}>Members</div>
//             </React.Fragment>
//           }
//         />
//         <Partition stretch>ondeck/asleep</Partition>
//         <AppBar bg={grey[900]}>
//           <Me user={users[0]} />
//         </AppBar>
//       </Partition>
//     </Partition>
//   </Partition>
// </Layout>
