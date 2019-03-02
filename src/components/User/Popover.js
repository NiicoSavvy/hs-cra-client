import React from 'react';
import { Popover } from '@material-ui/core';

class UserPopover extends React.Component {
  render() {
    const { open, anchorEl, onToggle } = this.props;
    return (
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={onToggle}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
      >
        {this.props.children}
      </Popover>
    );
  }
}

export default UserPopover;

/*


handleClickButton = () => {
    this.setState({
      open: true,
    });
  };

<Button
  buttonRef={node => {
    this.anchorEl = node;
  }}
  variant="contained"
  onClick={this.handleOpen}
>
  Open Popover
</Button>
 */
