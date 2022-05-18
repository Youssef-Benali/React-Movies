import React from "react";
import { Link } from "react-router-dom";

const MovieForm = ({ match, history }) => {
  return (
    <>
      <h1>Movie Form {match.params.id}</h1>
      <Link to="/movies">
        <button className="btn btn-primary" onClick={() => history.push('/movies') }>Save</button>
      </Link>
    </>
  );
};

export default MovieForm;
