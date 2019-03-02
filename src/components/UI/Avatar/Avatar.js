import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles, Avatar as MuiAvatar } from "@material-ui/core";
import { hexToRGB, getColorHash } from "../../../utils/colors";

const SHOW = "#00b5ad";
const AWAY = "#fbbd08";
const BUSY = "#db2828";
const HIDE = "#767676";

const styles = theme => ({
  indicator: {
    content: '""',
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 12,
    height: 12,
    borderRadius: "50%",
    background: HIDE
    //border: `2px solid ${hexToRGB(theme.palette.grey[900], 0.8)}`,
  },
  show: { background: SHOW },
  away: { background: AWAY },
  busy: { background: BUSY },
  hide: { background: HIDE }
});

function styleIndicator(indicator, label) {
  if (indicator) {
    const { online, status } = indicator;
    return online && status === label;
  }
}

const Avatar = ({ classes, name, imgUrl, indicator, ...rest }) => (
  <div style={{ position: "relative" }}>
    <MuiAvatar
      src={imgUrl}
      style={{ background: !imgUrl && getColorHash(name) }}
      alt={name}
      {...rest}
    >
      {name && name.charAt(0)}
    </MuiAvatar>
    {indicator && (
      <span
        className={classNames(
          classes.indicator,
          styleIndicator(indicator, "SHOW") && classes.show,
          styleIndicator(indicator, "AWAY") && classes.away,
          styleIndicator(indicator, "BUSY") && classes.busy
        )}
      />
    )}
  </div>
);

Avatar.propTypes = {
  /** Styling */
  classes: PropTypes.object.isRequired,

  /** avatar */
  imgUrl: PropTypes.string,

  /** name to take first char from */
  name: PropTypes.string.isRequired
};

Avatar.defaultProps = {
  imgUrl: null
};

export default withStyles(styles)(Avatar);
