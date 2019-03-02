import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles, Toolbar, Typography, IconButton } from "@material-ui/core";
import SuccessIcon from "@material-ui/icons/CheckBox";
import ErrorIcon from "@material-ui/icons/Report";
import InfoIcon from "@material-ui/icons/Info";
import WarningIcon from "@material-ui/icons/Warning";
import CloseIcon from "@material-ui/icons/Close";
import { amber, blue, green } from "@material-ui/core/colors";

import { hexToRGB } from "../../../utils/colors";

const BORDER = 5;
const ALPHA = 0.8;

const styles = theme => ({
  toolBar: {
    position: "relative",
    borderLeft: `${BORDER}px solid ${theme.palette.primary.main}`,
    color: theme.palette.primary.main,
    background: hexToRGB(theme.palette.grey[800], ALPHA),
    "&:after": {
      content: '""',
      position: "absolute",
      width: 0,
      height: 0,
      right: 0,
      borderTop: "32px solid transparent",
      borderBottom: "32px solid transparent",
      borderRight: `32px solid ${theme.palette.primary.main}`,
      borderRightColor: "inherit"
    }
  },
  icon: {
    marginRight: theme.spacing.unit
  },
  info: {
    color: blue[500],
    borderColor: blue[500]
  },
  error: {
    color: theme.palette.error.main,
    borderColor: theme.palette.error.main
  },
  warning: {
    color: amber[500],
    borderColor: amber[500]
  },
  success: {
    color: green.A400,
    borderColor: green.A400
  },
  closeBtn: {
    position: "absolute",
    color: theme.palette.common.white,
    padding: theme.spacing.unit / 4,
    right: 0,
    zIndex: 2
  }
});

const Banner = props => {
  const { classes, info, error, warning, success, close } = props;
  return (
    <Toolbar
      className={classNames(
        classes.toolBar,
        info && classes.info,
        error && classes.error,
        warning && classes.warning,
        success && classes.success
      )}
    >
      {error && <ErrorIcon className={classes.icon} />}
      {info && <InfoIcon className={classes.icon} />}
      {success && <SuccessIcon className={classes.icon} />}
      {warning && <WarningIcon className={classes.icon} />}

      <Typography>{props.children}</Typography>

      {close && (
        <IconButton
          className={classes.closeBtn}
          aria-label="Close"
          onClick={close}
        >
          <CloseIcon />
        </IconButton>
      )}
    </Toolbar>
  );
};

export default withStyles(styles)(Banner);
