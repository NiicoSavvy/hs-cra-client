import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";

function DeckModal(props) {
  const { open, htmlId, onClose, onSubmit } = props;

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby={htmlId}>
      <DialogTitle id={htmlId}>Create New Deck</DialogTitle>

      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText>

        {props.children}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="default">
          Cancel
        </Button>
        <Button onClick={onSubmit} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeckModal;
