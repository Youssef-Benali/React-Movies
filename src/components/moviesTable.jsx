import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "../common/table";
import Like from "../common/like";

class MoviesTable extends Component {
  // This object allows to easely pass the path for every element in the database via props
  columns = [
    {
      path: "title",
      label: "Title",
      content: (movies) => (
        <Link to={`/movies/${movies._id}`}>{movies.title}</Link>
      ),
    },
    { path: "genre", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    // Passing a function that return an entire component, don't forget to change this.onLike (or onLike) by this.props.onLike to prevent
    // undefined error
    {
      key: "like",
      content: (movie) => (
        <Like liked={movie.liked} onLike={() => this.props.onLike(movie)} />
      ),
    },
    {
      key: "delete",
      content: (movie) => (
        <button
          onClick={() => this.props.onDelete(movie)}
          className="btn btn-sm btn-danger font-weight-bold"
        >
          Delete
        </button>
      ),
    },
  ];

  render() {
    const { movies, onSort, sortColumn } = this.props;

    return (
      <>
        <Table
          columns={this.columns}
          data={movies}
          sortColumn={sortColumn}
          onSort={onSort}
        />
      </>
    );
  }
}

export default MoviesTable;
