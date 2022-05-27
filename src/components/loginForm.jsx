import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";

class LoginForm extends Form {
  // ! A state can't be null or undefined
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string()
      .required()
      .label("Username")
      .min(5),
    password: Joi.string()
      .required()
      .label("Password")
      .min(5),
  };

  // errors['username'] (if it was an array, find() method...)

  doSubmit = () => {
    // Call the server
  };

  render() {
    return (
      <>
        <div className="container">
          <h1>Login</h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("username", "Username")}
            {this.renderInput("password", "Password", "password")}
            {this.renderButton("Login")}
          </form>
        </div>
      </>
    );
  }
}

export default LoginForm;
