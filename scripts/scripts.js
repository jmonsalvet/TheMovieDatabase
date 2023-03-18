const urlStart = "https://api.themoviedb.org/3/movie/";
const urlEnd = "?api_key=5a61df49417e1f9b5570d4163ba3c2cd&language=en-US&page=1"
const image_path = "https://image.tmdb.org/t/p/w500/";

// selectors
const main = document.querySelector(".main");
const input = document.querySelector(".search");
const classMoviesOptions = document.querySelectorAll(".classMoviesOptions")

// Filter by Class Movies
classMoviesOptions[0].addEventListener("click", ()=> init('popular'))
classMoviesOptions[1].addEventListener("click", ()=> init('upcoming'))
classMoviesOptions[2].addEventListener("click", ()=> init('top_rated'))
classMoviesOptions[3].addEventListener("click", ()=> init('now_playing'))

let movies;

function init(classMovies = "popular") {
  fetch(urlStart + classMovies + urlEnd)
    .then((response) => response.json())
    .then((data) => {
      movies = data.results;
      renderMovies(movies);
    })
    .catch((e) =>
      alert("Opss, error with the movie database!!!")
    );
}

function addListeners() {
  input.addEventListener("input", filterMovies);
}

function renderMovies(movies) {
  main.innerHTML = "";

  // Container movies
  const containerMovies = document.createElement("div")
  containerMovies.classList.add("movies")

  // Creation of movies in Container movies
  movies.forEach((movie) => {

    const movieCard = document.createElement("div");
    movieCard.classList.add("movieCard");

    const title = document.createElement("h2");
    title.classList.add("movieTitle");
    const titleText = document.createTextNode(movie.title);

    const img = document.createElement("img");
    img.src = image_path + movie.poster_path;
    img.alt = "Image movie"
    img.classList.add('movieImage')

    const ranking = document.createElement("p");
    ranking.classList.add("ranking");  
    const valor_ranking = document.createTextNode("Ranking: " + movie.vote_average);

    movieCard.appendChild(title).appendChild(titleText);
    movieCard.appendChild(img);
    movieCard.appendChild(ranking).appendChild(valor_ranking);
    containerMovies.appendChild(movieCard);
  });
  
  main.appendChild(containerMovies)
}

function filterMovies(e) {
  let text = e.target.value;

  if (text === "") {
    renderMovies(movies);
  } else {
    let filtered_movies = movies.filter((movie) =>
      movie.title.toLowerCase().includes(text.toLowerCase())
    );
    renderMovies(filtered_movies);
  }
}

init();
addListeners();