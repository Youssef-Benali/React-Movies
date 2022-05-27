import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import { saveMovie } from "../services/fakeMovieService";


  /* <Link to="/movies">
        <button className="btn btn-primary" onClick={() => history.push('/movies') }>Save</button>
      </Link> */


class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genre: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    errors: {},
  };

  schema = {
    title: Joi.string()
      .required()
      .label("Title"),
    genre: Joi.object()
      .required()
      .label("Genre"),
    numberInStock: Joi.number()
      .required()
      .label("Stock")
      .min(0)
      .max(100),
    dailyRentalRate: Joi.number()
      .required()
      .label("Rate")
      .min(0)
      .max(10),
    _id: Joi.optional(),
    liked: Joi.optional(),
  };

  

  doSubmit = () => {
    // Call the server
    const movies = { ...this.state.data };
    saveMovie(movies);
    this.props.history.push("/movies");
  };

  render() {
    return (
      <>
        <div style={{ margin: "1rem" }}>
          <h1>Movie Form </h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("title", "Title")}
            {this.renderList("genre", "Genre")}
            {this.renderInput("numberInStock", "Stock", "number")}
            {this.renderInput("dailyRentalRate", "Rate", "number")}
            {this.renderButton("Save")}
          </form>
        </div>
      </>
    );
  }
}

export default MovieForm;
