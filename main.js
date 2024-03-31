import axios from "axios";
import { getData } from "./modules/http";
import { reloadMovies, reloadTrailers } from "./modules/ui";

const now_playing = document.querySelector('.now_playing')
const now_playing_show_more = document.querySelector('.now_playing_show_more')
const trailers = document.querySelector('.trailers')

getData('https://api.themoviedb.org/3/movie/now_playing?language=ru-RU&page=1')
    .then(res => {
        reloadMovies(res.data.results.slice(0, 8), now_playing)
    })

now_playing_show_more.onclick = () => {
    if (!now_playing_show_more.classList.contains('active')) {
        now_playing_show_more.classList.add('active')

        getData('https://api.themoviedb.org/3/movie/now_playing?language=ru-RU&page=1')
            .then(res => reloadMovies(res.data.results, now_playing))

        now_playing_show_more.innerHTML = 'Скрыть'
    } else {
        now_playing_show_more.classList.remove('active')

        getData('https://api.themoviedb.org/3/movie/now_playing?language=ru-RU&page=1')
            .then(res => reloadMovies(res.data.results.slice(0, 8), now_playing))

        now_playing_show_more.innerHTML = 'Показать все'
    }
}

getData('https://api.themoviedb.org/3/movie/upcoming?language=ru-RU&page=1')
    .then(res => reloadTrailers(res.data.results, trailers))


let year_tabs = document.querySelectorAll('.year_tab')
const pop_movies = document.querySelector('.pop_movies')

getData('https://api.themoviedb.org/3/movie/popular?language=ru-RU&page=1')
    .then(res => {
        reloadMovies(res.data.results.slice(0, 4), pop_movies)
    })