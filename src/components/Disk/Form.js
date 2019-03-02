import React from 'react';

class DiskForm extends React.component {
  state = {
    disk: {
      name: '',
      topic: '',
    },
  };

  handleChange = ({ target: { value, name } }) => {
    const disk = this.state.disk;
    disk[name] = value;
    this.setState({ disk });
  };

  handleSubmit = () => this.props.onSubmit(this.state.disk);

  render() {
    return <div>Dick Form</div>;
  }
}

export default DiskForm;
