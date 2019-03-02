import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../../components/Auth/LoginForm";

class Login extends React.Component {
  handleSubmit = () => {
    console.log("You logged in!");
  };

  resetPassword = () => {
    console.log("Resend password reset request");
  };

  render() {
    return (
      <main className="LoginPage">
        <LoginForm onSubmit={this.handleSubmit} />
        <div>
          Need an Account? <Link to="/register">Register</Link>
          <br />
          <button onClick={this.resetPassword}>Forgot Password?</button>
        </div>
      </main>
    );
  }
}

export default Login;
