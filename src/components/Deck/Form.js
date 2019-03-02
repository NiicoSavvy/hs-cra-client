import React from "react";
import { TextField } from "@material-ui/core";

class DeckForm extends React.Component {
  state = {
    deck: {
      name: "",
      icon: ""
    }
  };

  handleChange = ({ target: { value, name } }) => {
    const deck = this.state.deck;
    deck[name] = value;
    this.setState({ deck });
  };

  handleSubmit = () => this.props.onSubmit(this.state.deck);

  render() {
    const { deck } = this.state;

    return (
      <React.Fragment>
        <form>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            fullWidth
          />

          <TextField margin="dense" id="icon" label="Icon Url" fullWidth />
        </form>

        {deck.icon && <img src={deck.icon} alt="Preview" />}
      </React.Fragment>
    );
  }
}

export default DeckForm;
