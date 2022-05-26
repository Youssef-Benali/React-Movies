import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import { getGenres } from "../services/fakeGenreService";
import { getMovie } from "../services/fakeMovieService";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  componentDidMount() {
    if (!this.props.match.params.id) return null;
    const data = getMovie(this.props.match.params.id);
    
    this.setState({ data });
    // console.log(this.props.match.params.id);
    console.log("form component", data);
  }

  validate = () => {
    // ! {abortEarly: false} prevent the default behavior that stop login errors when the first one get caught
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;
    console.log("validate", error);

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    // console.log("validateProperty")
    // Computed properties
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    // console.log("handleSubmit");
    e.preventDefault();

    const errors = this.validate();
    // Always return an empty object if this is not truthy
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    // console.log("handleChange")
    if (input === "") return null;
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  handleSelectedGenre = ({ currentTarget: selectedGenre }) => {
    // console.log("handleSelectedGenre")
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(selectedGenre);
    if (errorMessage) errors[selectedGenre.name] = errorMessage;
    else delete errors[selectedGenre.name];

    const data = { ...this.state.data };
    const genres = getGenres();
    const genre = genres.find((g) => g.name === selectedGenre.value);
    data["genreId"] = genre._id;

    this.setState({ data, errors });

    console.log(selectedGenre.value);
  };

  renderButton = (label) => {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  };

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderList(name, label, error) {
    const genres = getGenres();
    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <select
          onChange={this.handleSelectedGenre}
          className="form-control"
          id={name}
          name={name}
        >
          {genres.map((e) => (
            <option key={e._id}> {e.name}</option>
          ))}
        </select>
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    );
  }
}

export default Form;
