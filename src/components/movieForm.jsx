import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";

{
  /* <Link to="/movies">
        <button className="btn btn-primary" onClick={() => history.push('/movies') }>Save</button>
      </Link> */
}

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genres: "",
      stock: "",
      rate: "",
    },
    errors: {},
  };

  schema = {
    title: Joi.string()
      .required()
      .label("Title"),
    genres: Joi.string()
      .required()
      .label("Genres"),
    stock: Joi.number()
      .required()
      .label("Stock")
      .min(0)
      .max(100),
    rate: Joi.number()
      .required()
      .label("Rate")
      .min(0)
      .max(10),
  };

  render() {
    return (
      <>
        <h1>Movie Form </h1>;
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderList("genres", "Genres")}
          {this.renderInput("stock", "Stock", "number")}
          {this.renderInput("rate", "Rate", "number")}
          {this.renderButton("Save")}
        </form>
      </>
    );
  }
}

export default MovieForm;
