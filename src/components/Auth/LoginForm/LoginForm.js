import React from 'react';
import PropTypes from 'prop-types';
import { TextInput, PasswordInput } from '../../UI/Input';

/** Login form with built-in validation. */
class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        email: '',
        password: '',
      },
      errors: {},
      submitted: false,
    };
  }

  onChange = event => {
    const user = this.state.user;
    user[event.target.name] = event.target.value;
    this.setState({ user });
  };

  validate({ email, password }) {
    const errors = {};
    const { minPasswordLength } = this.props;

    if (!email) errors.email = 'Email required.';
    if (password.length < minPasswordLength)
      errors.password = `Password must be at least ${minPasswordLength} characters.`;

    this.setState({ errors });
    const formIsValid = Object.getOwnPropertyNames(errors).length === 0;
    return formIsValid;
  }

  onSubmit = () => {
    const { user } = this.state;
    const formIsValid = this.validate(user);
    if (formIsValid) {
      this.props.onSubmit(user);
      this.setState({ submitted: true });
    }
  };

  render() {
    const { errors, submitted } = this.state;
    const { email, password } = this.state.user;

    return (
      <div>
        <TextInput
          htmlId="login-form-email"
          name="email"
          type="email"
          onChange={this.onChange}
          label="Email"
          value={email}
          error={errors.email}
          required
        />

        <PasswordInput
          htmlId="login-form-password"
          name="password"
          value={password}
          onChange={this.onChange}
          showVisibilityToggle
          maxLength={50}
          error={errors.password}
        />

        <input type="submit" value="Login" onClick={this.onSubmit} disabled={submitted} />
      </div>
    );
  }
}

LoginForm.propTypes = {
  /** Called when form is submitted */
  onSubmit: PropTypes.func.isRequired,

  /** Minimum password length */
  minPasswordLength: PropTypes.number,
};

LoginForm.defaultProps = {
  minPasswordLength: 8,
};

export default LoginForm;
