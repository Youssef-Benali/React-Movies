import React, { Component } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";

import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { paginate } from "../utils/paginate";

import Pagination from "../common/pagination";
import ListGroup from "../common/listGroup";
import MoviesTable from "./moviesTable";
import SearchBar from "../common/searchBar";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    searchQuery: "",
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" },
    searchQuery: "",
  };

  // In component did mount, it's the perfect place to get data from the database
  // line 24: Adding an object with 2 keys before the entire table to be able to map the "All Genres" caterogy
  componentDidMount() {
    const genres = [{ name: "All Genres", _id: "" }, ...getGenres()];

    this.setState({ movies: getMovies(), genres });
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({
      selectedGenre: genre,
      currentPage: 1,
      searchQuery: "",
      movies: getMovies(),
    });
  };

  handleSearch = ({ currentTarget: search }) => {
    // Clear selectedGenre
    this.setState({ selectedGenre: null, searchQuery: search.value, currentPage: 1 });

    // Search a movie
    const movies = [...this.state.movies];
    const filteredMovie = movies.filter((movie) =>
      movie.title.toLowerCase().startsWith(search.value.toLowerCase())
    );
    if (filteredMovie.length === 0)
      return alert("No movie finded in the database");

    // Set movies
    this.setState({ movies: filteredMovie });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
  getPageDate = () => {
    const {
      pageSize,
      currentPage,
      selectedGenre,
      sortColumn,
      movies: allMovies,
    } = this.state;
    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, sortColumn } = this.state;

    if (count === 0)
      return <p className="pt-3 pb-1"> There are no movies in the database!</p>;

    const { totalCount, data: movies } = this.getPageDate();
    return (
      <>
        <section className="container">
          <div className="row">
            <article className="col-3">
              <ListGroup
                items={this.state.genres}
                selectedItem={this.state.selectedGenre}
                onItemSelect={this.handleGenreSelect}
              />
            </article>
            <article className="col">
              <Link
                style={{ marginTop: "1rem" }}
                className="btn btn-primary"
                to="/movies/new"
              >
                New Movie
              </Link>
              <p className="pt-3 pb-1">
                Showing {totalCount} movies in the database.
              </p>
              <SearchBar
                searchQuery={this.state.searchQuery}
                onSearch={this.handleSearch}
              />
              <MoviesTable
                movies={movies}
                sortColumn={sortColumn}
                onSort={this.handleSort}
                onDelete={this.handleDelete}
                onLike={this.handleLike}
              />
              <Pagination
                itemsCount={totalCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={this.handlePageChange}
              />
            </article>
          </div>
        </section>
      </>
    );
  }
}

// Set default props to prevent having too many props to pass via component
ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default Movies;
