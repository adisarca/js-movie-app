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
const pCards = document.querySelector('.pCards');
const tCards = document.querySelector('.tCards');
const uCards = document.querySelector('.uCards');





function movieSection(movies){
    cards.innerHTML = '';
    return  movies.map((movie) =>{
        if(movie.poster_path){
            
        return `
        <div class = cardInside>
        <img src="${IMG_URL + movie.poster_path}" data-movie-id ="${movie.id}" >
        <div class= "circle">${movie.vote_average}</div>
        <div class= "cardTitle">${movie.title}</div>
        </div>
        `
        }

       
    }).join(' ');
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
    
    const val = textSearch.value;
    const newUrl = url + '&query=' + val;
    fetch(newUrl)
        .then((res) => res.json())
        .then((data) =>{
            const movies = data.results;
            const movieBlock = createMovieSection(movies);
            cards.appendChild(movieBlock);
            if(movies.length == 0){
                title.innerHTML = "";
                alert(`We cannot find any results for ${val}`);
            }
            else{
                title.innerHTML = textSearch.value;
            }
        })
        
}


function loadPopular(){
    let popularUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=1`;
    fetch(popularUrl)
        .then((res) => res.json())
        .then((data) =>{
            const movies = data.results;
            const movieBlock = createMovieSection(movies);
            pCards.appendChild(movieBlock);
        })
}

function loadTop(){
    let popularUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}&language=en-US&page=1`;
    fetch(popularUrl)
        .then((res) => res.json())
        .then((data) =>{
            const movies = data.results;
            const movieBlock = createMovieSection(movies);
            tCards.appendChild(movieBlock);
        })
}


function loadNext(){
    let popularUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${api_key}&language=en-US&page=1`;
    fetch(popularUrl)
        .then((res) => res.json())
        .then((data) =>{
            const movies = data.results;
            const movieBlock = createMovieSection(movies);
            uCards.appendChild(movieBlock);
        }) 
}



loadNext();
loadTop();
loadPopular();


document.onclick = function(e){
    const target = e.target;
    if(target.tagName.toLowerCase() === 'img'){
        const movie_id = target.dataset.movieId;
        let  ID =  movie_id;
        sessionStorage.setItem("movieID", ID);
        window.location.href="details.html";
    }
}    





