
import {API_KEY} from './api.js';
const Movie_id = sessionStorage.getItem("movieID");;
const api_key = API_KEY;

let modalUrl = `https://api.themoviedb.org/3/movie/${Movie_id}?api_key=${api_key}&language=en-US`

let view = document.querySelector('#view');
let imgHolder = document.querySelector('.image-holder');
let oTitle = document.querySelector('.oTitle');
let description = document.querySelector('#description');
let play = document.querySelector('.play');
const IMG_URL = 'https://image.tmdb.org/t/p/w500/';
const poster = 'https://image.tmdb.org/t/p/original/';

function load(){
    fetch(modalUrl)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        imgHolder.innerHTML = `<img src="${IMG_URL + data.poster_path}" alt="">`;
        oTitle.innerHTML = data.title;
        description.innerHTML = data.overview;
        view.style.backgroundImage = `url(${poster + data.poster_path})`
        play.onclick = function(){
            window.location.href = `${data.homepage}`
        }
    })
}

load()


