import React from "react";
import {
  withStyles,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton
} from "@material-ui/core";
import CopyIcon from "@material-ui/icons/FileCopyOutlined";
import SuccessIcon from "@material-ui/icons/CheckCircleOutline";

const styles = theme => ({
  textField: {
    margin: theme.spacing.unit
  }
});

class Invitation extends React.Component {
  state = {
    invite: {
      code: ""
    },
    copied: false
  };

  copyToClipboard = () => {
    const copyText = document.getElementById("invite");
    copyText.select();
    document.execCommand("Copy");
    this.setState({ copied: true });
    setTimeout(() => this.setState({ copied: false }), 1000);
    // TODO: Add toast 'Copied!'
  };

  render() {
    const { classes, invite, copied } = this.state;
    return (
      <form>
        <FormControl className={classes.textField}>
          <InputLabel htmlFor="invite">Invite Code</InputLabel>
          <Input
            id="invite"
            value={invite.code}
            //onChange={this.handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="Copy To Clipboard"
                  onClick={this.copyToClipboad}
                >
                  {copied ? <SuccessIcon /> : <CopyIcon />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </form>
    );
  }
}

export default withStyles(styles)(Invitation);

/* 
<Input
						id="invite"
						action={{
							color: copied ? "teal" : "violet",
							labelPosition: "right",
							icon: copied ? "check circle outline" : "copy",
							content: copied ? t("Done") : t("Copy"),
							onClick: this.copyToClipboard
						}}
						value={invite}
					/>
*/
