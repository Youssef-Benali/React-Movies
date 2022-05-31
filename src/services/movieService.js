import http from "../services/httpService";

import { apiUrl } from "../config.json";

const apiEndPoint = apiUrl + "/movies";

function movieUrl(id){
  return `${apiEndPoint}/${id}`;
}

export async function getMovies() {
  return http.get(apiEndPoint);
}

export async function getMovieById(movieId) {
  return http.get(movieUrl(movieId));
}

export async function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(movieUrl(movie._id), body);
  }

  return http.post(apiEndPoint, movie);
}

export function deleteMovie(movieId) {
  return http.delete(movieUrl(movieId));
}