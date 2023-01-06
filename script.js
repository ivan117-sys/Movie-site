// "use strict";

// Variables
const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1";
const image = "https://image.tmdb.org/t/p/w500/";
const search_URL =
  'https://api.themoviedb.org/3/search/movie?&api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';

const form = document.querySelector(".form");
const main = document.querySelector(".main");
console.log(main);
const input = document.querySelector(".form-input");
const container = document.querySelector(".container");
const section = document.querySelector(".movie-section");
const sort = document.querySelector(".button-score");
console.log(sort);

// Grabbing movies

const grabbingMovie = async function (url) {
  try {
    const data = await fetch(url);
    result = await data.json();
    showMovies(result.results);
    sorter(result.results);
    console.log(result);
    movies = result;
  } catch (err) {
    console.error(`${err} 💥`);
  }
};

// Sorting movies
const sorter = function (results) {
  console.log(results);
  sort.addEventListener("click", () => {
    results.sort((a, b) => (a.vote_average < b.vote_average ? 1 : -1));
    container.innerHTML = "";

    results.forEach((movie) => {
      const movieEl = document.createElement("div");

      movieEl.classList.add("movies");

      voteColor(movie.vote_average);
      movieEl.innerHTML = `
    <img src= ${image + movie.poster_path} alt=${image + movie.poster_path} />
    <div class="movie">
    <h3 class="movie-title">${movie.title}</h3>
    <span class="movie-grade ${voteColor(movie.vote_average)}">${
        movie.vote_average
      }</span>
    </div>
    <div class="overview">
      <h3>Overview</h3>
      ${movie.overview}`;
      container.appendChild(movieEl);
    });
  });
};
const showMovies = function (results) {
  // Displaying movies
  container.innerHTML = "";

  sort.addEventListener("click", sorter);
  results.forEach((movie) => {
    const movieEl1 = document.createElement("div");

    movieEl1.classList.add("movies");

    voteColor(movie.vote_average);
    movieEl1.innerHTML = `
    <img src= ${image + movie.poster_path} alt=${image + movie.poster_path} />
    <div class="movie">
    <h3 class="movie-title">${movie.title}</h3>
    <span class="movie-grade ${voteColor(movie.vote_average)}">${
      movie.vote_average
    }</span>
    </div>
    <div class="overview">
      <h3>Overview</h3>
      ${movie.overview}`;
    container.appendChild(movieEl1);
  });
};
// Helper color function
const voteColor = function (vote) {
  if (vote >= 7) {
    return "green";
  } else if (vote >= 4) {
    return "orange";
  } else {
    return "red";
  }
};

grabbingMovie(API_URL);

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const search = input.value;

  if (search !== "") {
    grabbingMovie(search_URL + search);

    input.value = "";
  } else {
    window.location.reload();
  }
});
