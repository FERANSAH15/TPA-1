const URL = "https://api.themoviedb.org/3/discover/movie?api_key=8b7dd9dfb7115e5bb7dc33c91c761552";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=8b7dd9dfb7115e5bb7dc33c91c761552&query=";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";


const main = document.getElementById("content");
const form = document.getElementById("form");
const search = document.getElementById("search");


getMovies(URL);

async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();
    console.log(respData);
    showMovies(respData.results);
}

// Menampilkan list film
function showMovies(movies) {
    main.innerHTML = "";
    movies.forEach((movie) => {
        const { poster_path, title, vote_average, release_date } = movie;
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");
        movieEl.innerHTML = `
            <img src="${IMGPATH + poster_path}" alt="${title}"/>
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            
            <div class="release">
                <h3>Release:</h3>
                ${release_date}
            </div>
        `;

        main.appendChild(movieEl);
    });
}

function getClassByRate(vote) {
    if (vote >= 8) {
        return "green";
    } else if (vote >= 5) {
        return "orange";
    } else {
        return "red";
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    if (searchTerm) {
        getMovies(SEARCHAPI + searchTerm);
        search.value = "";
    }
});
