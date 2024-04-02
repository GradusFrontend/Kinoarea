import axios from "axios";
import { getData } from "./modules/http";
import { reloadMovies, reloadTrailers, topPersons, reloadGenres, reloadMovieRes, reloadPersonRes } from "./modules/ui";

const now_playing = document.querySelector('.now_playing')
const now_playing_show_more = document.querySelector('.now_playing_show_more')
const trailers = document.querySelector('.trailers')

getData('https://api.themoviedb.org/3/movie/now_playing?language=ru-RU&page=1')
    .then(res => {
        reloadMovies(res.data.results.slice(0, 8), now_playing)
    })

const genres_tabs_wrap = document.querySelector('.genres_tabs')

getData('https://api.themoviedb.org/3/genre/movie/list?language=ru-RU')
    .then(res => {
        reloadGenres(res.data.genres.slice(0, 6), genres_tabs_wrap)

        const genres_tabs = document.querySelectorAll('.genre_tab')
    
        let prevGenre = 0
        genres_tabs.forEach((tab, idx) => {

            tab.onclick = () => {
                genres_tabs[prevGenre].classList.remove('genre_tab_active')
                tab.classList.add('genre_tab_active')
                prevGenre = idx
                if (tab.dataset.genre === 'all') {
                    getData('https://api.themoviedb.org/3/movie/now_playing?language=ru-RU&page=1')
                        .then(res => {
                            reloadMovies(res.data.results.slice(0, 8), now_playing)
                        })
                } else {
                    getData(`https://api.themoviedb.org/3/discover/movie?with_genres=${tab.dataset.genre}&language=ru-RU`)
                        .then(res => {
                            reloadMovies(res.data.results.slice(0, 8), now_playing)
                        })
                }
            }
        })
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


let prev = 0
year_tabs.forEach((tab, idx) => {

    tab.onclick = () => {
        year_tabs[prev].classList.remove('year_tab_active')
        tab.classList.add('year_tab_active')
        prev = idx

        if (tab.dataset.year === 'all') {
            getData('https://api.themoviedb.org/3/movie/popular?language=ru-RU&page=1')
                .then(res => {
                    console.log(res.data.results);
                    reloadMovies(res.data.results.slice(0, 4), pop_movies)
                })
        } else {
            getData(`https://api.themoviedb.org/3/discover/movie?primary_release_year=${tab.dataset.year}&language=ru-RU&page=1`)
                .then(res => {
                    console.log(res.data.results);

                    reloadMovies(res.data.results.slice(0, 4), pop_movies)
                })
        }
    }
})


const persons_wrap = document.querySelector('.persons')

getData(`https://api.themoviedb.org/3/person/popular?language=ru-RU&page=1`)
    .then(res => {
        topPersons(res.data.results.slice(0, 2), res.data.results.slice(3, 6), persons_wrap)
    })

const upcoming_wrap = document.querySelector('.upcoming')

getData('https://api.themoviedb.org/3/movie/upcoming?language=ru-RU&page=1')
    .then(res => {
        reloadMovies(res.data.results.slice(0, 4), upcoming_wrap)
    })


//  searching
const search_btn = document.querySelector('.search_btn')
const search_wrap = document.querySelector('.search_wrap')
const nav = document.querySelector('nav')
const close_btn = document.querySelector('.close')
const search_inp = document.querySelector('#search_inp')
const movie_res_wrap = document.querySelector('.movie_res_wrap')
const person_res_wrap = document.querySelector('.person_res_wrap')
const body = document.body

search_btn.onclick = () => {
    search_btn.classList.add('invisible')
    nav.classList.add('invisible')
    search_wrap.classList.remove('invisible')
    body.style.overflowY = 'hidden'
}

close_btn.onclick = () => {
    search_btn.classList.remove('invisible')
    nav.classList.remove('invisible')
    search_wrap.classList.add('invisible')
    body.style.overflowY = 'visible'
}

search_inp.onkeyup = (e) => {
    let val = e.target.value
    
    getData(`https://api.themoviedb.org/3/search/movie?query=${val}&include_adult=false&language=ru-RU&page=1`)
        .then(res => {
            reloadMovieRes(res.data.results.slice(0, 5), movie_res_wrap)
        })
    getData(`https://api.themoviedb.org/3/search/person?query=${val}&include_adult=false&language=ru-RU&page=1`)
        .then(res => {
            reloadPersonRes(res.data.results.slice(0, 5), person_res_wrap)
        })
}





