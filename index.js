// const global = {
//   currentPage: window.location.pathname,
//   search: {
//     term: "",
//     type: "",
//     page: 1,
//     totalPages: 1,
//     totalResults: 0,
//   },
// };
async function searchmovies(query) {
  const url = `https://api.themoviedb.org/3/search/multi?include_adult=false&language=en-US&page=1?&query=${query}`;
  const result = await fetch(url, {
    method: "GET",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YzBkZjBlZDNiMjIyMDgwMDc3NzM2Mzg4ODEwMGM4ZiIsIm5iZiI6MTc0OTc5NTczOS42NjIwMDAyLCJzdWIiOiI2ODRiYzM5YjFmNmQxOGU2NTEzZmRlZGQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.9KOzF92SpnaBDZiJGNFUiJlX52JyFSTJNv1FHiJF-Yw",
      Accept: "application/json",
    },
  });
  const data = await result.json();
  const results = data.results;
  results.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("trending-movies");
    // Example: check if movie.media_type is not 'tv'
    if (movie.media_type === "tv") {
      div.innerHTML = `
            <img class="trending-image" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.name}">
                           <p class="card-body">${movie.name}</p>
                            <p class="date-produced">fitst air date:${movie.first_air_date}</p>
                <p class="date-produced">rating:${movie.vote_average}/10%</p>
            </div>
        `;
    } else if (movie.media_type === "movie") {
      div.innerHTML = `
            <img class="trending-image" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}">
            <div class="card-body">
                <a href="details.html"><h3 class="movie-name">${movie.title}</h3></a>
                <p class="date-produced"> Date-released:${movie.release_date}</p>
                <p class="date-produced">rating:${movie.vote_average}/10%</p>
            </div>
        `;
      document.querySelector(".search-results").appendChild(div);
    } else {
      div.innerHTML = `  <img class="trending-image" src="https://image.tmdb.org/t/p/w500/${movie.profile_path}" alt="${movie.original_name}">
            <div class="card-body">
                <a href="details.html"><h3 class="movie-name">${movie.name}</h3></a>
                <p class="date-produced">role:${movie.known_for_department}</p>
                <p class="date-produced">rating:${movie.popularity}/10%</p>
            </div>`;
    }
    document.querySelector(".search-results").appendChild(div);
  });
}

async function displaymovies() {
  const { results } = await fetchapidata("movie/popular");
  results.forEach((movie) => {
    const div = document.createElement("div");
    const vote = Math.round(movie.vote_average);

    div.classList.add("trending-movies");
    div.innerHTML = `
            <img class="trending-image" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}">
            <div class="card-body">
            <a href="details.html"><h3 class="movie-name">${movie.title}</h3></a>
            <p class="date-produced"> Date-released:${movie.release_date}</p>
            <p class="date-produced">rating:${vote}/10%</p>
            </div>
        `;
    document.querySelector("#popular").appendChild(div);
  });
}
async function display() {
  const { results } = await fetchapidata("movie/popular");
  results.forEach((movie) => {
    const div = document.createElement("div");
    const vote = Math.round(movie.vote_average);

    div.classList.add("trending-movies");
    div.innerHTML = `
            <img class="trending-image" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}">
            <div class="card-body">
            <a href="details.html"><h3 class="movie-name">${movie.title}</h3></a>
            <p class="date-produced"> Date-released:${movie.release_date}</p>
            <p class="date-produced">rating:${vote}/10%</p>
            </div>
        `;
    document.querySelector("#popular").appendChild(div);
  });
}

async function fetchapidata(api_url) {
  const apikey = "3fd2be6f0c70a2a598f084ddfb75487c";
  const BaseUrl = "https://api.themoviedb.org/3/";
  const res = await fetch(
    `${BaseUrl}${api_url}?api_key=${apikey}&language=en-US`
  );
  return res.json();
}

async function backgroundImage() {
  const { results } = await fetchapidata("movie/popular");
  const welcome = document.querySelector("#welcome");
  const randomIndex = results[Math.floor(Math.random() * results.length)];
  // document.querySelector(".the-div").style.backgroundImage=`url(https://image.tmdb.org/t/p/w500/${randomIndex.backdrop_path})`
  //  document.querySelector(".the-div").style.backgroundImage.opacity="0"

  welcome.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500/${randomIndex.backdrop_path})`;
  welcome.style.backgroundSize = "cover";
  welcome.style.backgroundPosition = "center";
  // welcome.style.height = "100vh";
  // welcome.style.opacity = "0.5";
}
// backgroundImage()
// displaymovies();
function eventlistener() {
  const today = document.querySelector(".today");
  const this_week = document.querySelector(".week");

  today.addEventListener("click", (e) => {
    today.classList.add("trending-button");
    this_week.classList.remove("trending-button");
    trendingmovies();
  });

  this_week.addEventListener("click", (e) => {
    this_week.classList.add("trending-button");
    today.classList.remove("trending-button");
    trendingmoviesweek();
  });
}
const search_button = document.querySelector("#search-button");
const search_input = document.querySelector("#search-second");
function search_btn() {
  search_button.addEventListener("click", onclick);
  function onclick() {
    const search_value = search_input.value;
    if (search_input.value === "") {
      alert("please search for something");
    } else {
      searchmovies(search_value);
      search_input.value = "";
    }
  }
  search_input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const search_value = search_input.value;
      if (search_input.value === "") {
        alert("please search for something");
      } else {
        searchmovies(search_value);
        
        search_input.value = "";
      }
      
    }
  });
  const search_first = document.querySelector("#search-input");
  // console.log(search_first)
  search_first.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const search_value = search_first.value;
      if (search_first.value === "") {
        alert("please search for something");
      } else {
        searchmovies(search_value);
        // searchmovies().value=""
        search_first.value = "";
        console.log(window.location)
      }
    }
    
  });
}
async function trendingmovies() {
  const url = "https://api.themoviedb.org/3/trending/all/day?language=en-US";
  const result = await fetch(url, {
    method: "GET",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YzBkZjBlZDNiMjIyMDgwMDc3NzM2Mzg4ODEwMGM4ZiIsIm5iZiI6MTc0OTc5NTczOS42NjIwMDAyLCJzdWIiOiI2ODRiYzM5YjFmNmQxOGU2NTEzZmRlZGQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.9KOzF92SpnaBDZiJGNFUiJlX52JyFSTJNv1FHiJF-Yw",
      Accept: "application/json",
    },
  });
  const data = await result.json();
  const results = data.results;
  results.forEach((movie) => {
    const div = document.createElement("div");
    const vote = Math.round(movie.vote_average);

    div.classList.add("trending-movies");
    if (movie.media_type === "movie") {
      div.innerHTML = `
            <img class="trending-image" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}">
            <div class="card-body">
            <a href="details.html"><h3 class="movie-name">${movie.title}</h3></a>
            <p class="date-produced"> Date-released:${movie.release_date}</p>
            <p class="date-produced">rating:${vote}/10%</p>
            </div>
        `;
    } else {
      div.innerHTML = `
            <img class="trending-image" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.original_name}">
            <div class="card-body">
            <a href="details.html"><h3 class="movie-name">${movie.name}</h3></a>
            <p class="date-produced"> first-air-date:${movie.first_air_date}</p>
            <p class="date-produced">rating:${vote}/10%</p>
            </div>
        `;
    }
    document.querySelector(".the-div").appendChild(div);
  });
  ;
}

async function trendingmoviesweek() {
  const url = "https://api.themoviedb.org/3/trending/all/week?language=en-US";
  const result = await fetch(url, {
    method: "GET",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YzBkZjBlZDNiMjIyMDgwMDc3NzM2Mzg4ODEwMGM4ZiIsIm5iZiI6MTc0OTc5NTczOS42NjIwMDAyLCJzdWIiOiI2ODRiYzM5YjFmNmQxOGU2NTEzZmRlZGQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.9KOzF92SpnaBDZiJGNFUiJlX52JyFSTJNv1FHiJF-Yw",
      Accept: "application/json",
    },
  });
  const data = await result.json();
  const results = data.results;
  console.log(results);
  results.forEach((movie) => {
    const div = document.createElement("div");
    const vote = Math.round(movie.vote_average);

    div.classList.add("trending-movies");
    if (movie.media_type === "movie") {
      div.innerHTML = `
            <img class="trending-image" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}">
            <div class="card-body">
            <a href="details.html"><h3 class="movie-name">${movie.title}</h3></a>
            <p class="date-produced"> Date-released:${movie.release_date}</p>
            <p class="date-produced">rating:${vote}/10%</p>
            </div>
        `;
    } else {
      div.innerHTML = `
            <img class="trending-image" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.original_name}">
            <div class="card-body">
            <a href="details.html"><h3 class="movie-name">${movie.name}</h3></a>
            <p class="date-produced"> first-air-date:${movie.first_air_date}</p>
            <p class="date-produced">rating:${vote}/10%</p>
            </div>
        `;
    }
    document.querySelector(".the-div").appendChild(div);
  });
  return data;
}
async function details() {}

let timeoutId
document.addEventListener("scroll",()=>{
  if(timeoutId)   clearTimeout(timeoutId);
  timeoutId=setTimeout(()=>{
document.querySelector("#search").style.position="fixed"
 document.querySelector("#search").style.top="0px"
  },400)
 
})


    // trendingmovies()
    displaymovies();
    eventlistener();
    backgroundImage();
    search_btn();

    