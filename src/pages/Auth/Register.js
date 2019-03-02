import React from "react";
import { Link } from "react-router-dom";

import RegistrationForm from "../../components/Auth/RegistrationForm";

class Register extends React.Component {
  handleSubmit = () => {
    console.log("You Registered!");
  };

  render() {
    return (
      <main className="RegisterPage">
        <RegistrationForm onSubmit={this.handleSubmit} />
        <div>
          Have an account? <Link to="/login">Login</Link>
          <br />
        </div>
      </main>
    );
  }
}

export default Register;
