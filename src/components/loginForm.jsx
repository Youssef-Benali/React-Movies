import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import auth from "../services/authService";
import { Redirect } from "react-router-dom";

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
      await auth.login(data.username, data.password);
      // ! window.location will cause a full reload of the page (rerender)
      // * if a state props location exist, it will be redirect to it to be accurate with a login scenario

      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if(auth.getCurrentUser()) return <Redirect to="/"/>
    
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
