const keyword = document.querySelector('.keyword');
const form = document.querySelector('form');
const movieContainer = document.querySelector('#movie-container');
const modalBody = document.querySelector('.modal-body');

form.addEventListener('submit', async function () {
    try {
        const movies = await getMovies(keyword.value);
        updateMovies(movies);
    } catch (error) {
        alert(error);
    }
});

document.addEventListener('click', async function (e) {
    if (e.target.classList.contains('btn-detail')) {
        try {
            const detailMovie = await getDetailMovie(e.target.dataset.id);
            showDetailMovie(detailMovie);
        } catch (error) {
            alert(error);
        }
    }
});

function getMovies (keyword) {
    return fetch('http://www.omdbapi.com/?apikey=40d96d7d&s='+ keyword)
    .then(response => {
        if (!response.ok) {
            return response.statusText;
        }
        return response.json();
    })
    .then(response => {
        if (response.Response === "False") {
            throw new Error(response.Error);
        }
        return response.Search;
    });
}

function getDetailMovie (imdbid) {
    return fetch('http://www.omdbapi.com/?apikey=40d96d7d&i='+ imdbid)
    .then(response => {
        if (!response.ok) {
            return response.statusText;
        }
        return response.json();
    })
    .then(response => {
        if (response.Response === "False") {
            throw new Error(response.Error);
        }
        return response;
    });
}

function updateMovies(movies) {
    let cards = "";
    movies.forEach(m => cards += showCards(m));
    movieContainer.innerHTML = cards;
}

function showCards (movies) {
    return /*html*/`<div class="col-lg-3 col-md-4 col-sm-6 mb-3">
        <div class="card shadow h-100">
            <img src="${movies.Poster}" class="card-img-top" alt="${movies.Title}">
            <div class="card-body">
                <h5 class="card-title">${movies.Title}</h5>
                <p class="card-text">${movies.Year}</p>
                <a href="#modal-detail" data-id="${movies.imdbID}" class="btn btn-primary btn-detail" data-toggle="modal">Detail</a>
            </div>
        </div>
    </div>`;
}

function showDetailMovie(movie) {
    modalBody.innerHTML = /*html*/`
        <div class="row">
            <div class="col-md-3 text-center mb-3">
                <img src="${movie.Poster}" alt="${movie.Title}" class="img-fluid">
            </div>
            <div class="col-md-9">
                <ul class="list-group">
                    <li class="list-group-item"><h3>${movie.Title}</h3></li>
                    <li class="list-group-item"><span class="font-weight-bold">Year :</span> ${movie.Year}</li>
                    <li class="list-group-item"><span class="font-weight-bold">Genre :</span> ${movie.Genre}</li>
                    <li class="list-group-item"><span class="font-weight-bold">Released :</span> ${movie.Released}</li>
                    <li class="list-group-item"><span class="font-weight-bold">Production :</span> ${movie.Production}</li>
                    <li class="list-group-item"><span class="font-weight-bold">Runtime :</span> ${movie.Runtime}</li>
                    <li class="list-group-item"><span class="font-weight-bold">Director :</span> ${movie.Director}</li>
                    <li class="list-group-item"><span class="font-weight-bold">Actors :</span> ${movie.Actors}</li>
                    <li class="list-group-item"><span class="font-weight-bold">Writer :</span> ${movie.Writer}</li>
                    <li class="list-group-item"><span class="font-weight-bold">Plot :</span> ${movie.Plot}</li>
                </ul>
            </div>
        </div>
    `;
}