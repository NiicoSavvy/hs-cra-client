import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { withStyles, Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import MailIcon from "@material-ui/icons/AlternateEmail";
import ProfileIcon from "@material-ui/icons/AccountCircle";

import Partition from "../UI/Partition";
import Decks from "./List";
import DeckModal from "./Modal";
import DeckForm from "./Form";

const styles = theme => ({
  layout: {
    padding: `${theme.spacing.unit}px 0`,
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      flexDirection: "row",
      padding: `0 ${theme.spacing.unit}px`
    }
  },
  fab: {
    margin: "0 auto",
    color: theme.palette.common.white,
    [theme.breakpoints.down("xs")]: {
      margin: "auto 0"
    }
  },
  hr: {
    margin: 2 * theme.spacing.unit
  },
  outline: {
    background: "transparent",
    border: "2px dashed white",
    opacity: 0.6,
    "&:hover": {
      border: "2px solid white",
      background: "transparent",
      opacity: 1
    }
  }
});

const LinkToMe = props => <Link to="/@me" {...props} />;
const LinkToEM = props => <Link to="/encrypted/d" {...props} />;

/** displays:
 * link to profile/encrypted page,
 * decks current user is a member of, and
 * the add/join a deck button
 * */
class DeckPanel extends React.Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;
    const { classes, color, decks, deck, enc } = this.props;

    return (
      <React.Fragment>
        <Partition bg={color} className={classes.layout}>
          <Fab
            size="medium"
            color="primary"
            aria-label={enc ? "Link to Profile" : "Link to EMs"}
            className={classes.fab}
            component={enc ? LinkToMe : LinkToEM}
          >
            {enc ? <ProfileIcon /> : <MailIcon />}
          </Fab>
          <hr className={classes.hr} />

          <Decks decks={decks} deck={deck} encrypted={enc} />

          <Fab
            size="medium"
            aria-label="Add or Join"
            className={classNames(classes.fab, classes.outline)}
            onClick={this.handleClickOpen}
          >
            <AddIcon />
          </Fab>
        </Partition>

        <DeckModal
          htmlId="deck-modal-form"
          open={open}
          onClose={this.handleClose}
        >
          <DeckForm onSubmit />
        </DeckModal>
      </React.Fragment>
    );
  }
}
DeckPanel.propTypes = {
  /** Styling */
  classes: PropTypes.object.isRequired,

  /** controls the background color */
  color: PropTypes.string,

  /** list of member decks */
  decks: PropTypes.array,

  encrypted: PropTypes.bool
};

DeckPanel.defaultProps = {
  color: "transparent",
  decks: [],
  encrypted: false
};

export default withStyles(styles)(DeckPanel);
