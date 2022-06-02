import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import { login } from "../services/authService";

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

  doSubmit = async () => {
    try {
      const { data } = this.state;
      const { data: jwt } = await login(data.username, data.password);
      localStorage.setItem("token", jwt);
      this.props.history.push("/");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
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
