//API
import {API_KEY} from './api.js';
const api_key = API_KEY;
const url = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&page=1&include_adult=false`
const IMG_URL = 'https://image.tmdb.org/t/p/w500/'


//DOM ELEMENTS
const textSearch = document.querySelector('#searchText');
const btnSearch = document.querySelector('#searchButton');
const cards = document.querySelector('.cards');
const title = document.querySelector('.title');

function movieSection(movies){
    cards.innerHTML = '';
    return  movies.map((movie) =>{
        if(movie.poster_path){
        return ` <img src="${IMG_URL + movie.poster_path}" data-movie-id ="${movie.id}">`
        }
       
    })
}

function createMovieSection(movies){
    const movieEl = document.createElement('div');
    movieEl.setAttribute('class', 'card');

    const template = `
    <div class="cards">
        ${
           
           movieSection(movies)
        }
    </div>
    `

    movieEl.innerHTML = template;
    return movieEl;

}

btnSearch.onclick = function (){
    title.innerHTML = textSearch.value;
    const val = textSearch.value;
    const newUrl = url + '&query=' + val;
    fetch(newUrl)
        .then((res) => res.json())
        .then((data) =>{
            const movies = data.results;
            const movieBlock = createMovieSection(movies);
            cards.appendChild(movieBlock);
            console.log(data);
            if(movies.length == 0){
                title.innerHTML = `We cannot find any results for "<span style="color:red">${val}</span>"`;
            }
        })
        .catch((error) =>{
            console.log(error);
        })
}
