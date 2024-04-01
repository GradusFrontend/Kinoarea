import { getData } from "../../modules/http";
import { reloadMovies, reloadInfo, reloadRoles } from "../../modules/ui";

let id = location.search.split('=').at(-1)

let movieName
let movieRelease
let movieRating

const backdrop = document.querySelector('.backdrop')
const movie_name = document.querySelector('.movie_name')
const movie_name_orig = document.querySelector('.movie_name_orig')
const score = document.querySelector('.score_text')
const desc = document.querySelector('.desc')
const poster = document.querySelector('.poster')
const scorePercent = document.querySelector('.percent')
const scoreFill = document.querySelector('.fill')
const info_wrap = document.querySelector('.info')
const in_role_grid = document.querySelector('.in_role_grid')
const trailer_src = document.querySelector('.trailer_src')
const trailer_name = document.querySelector('.trailer_name')
const posters_box = document.querySelector('.posters_box')
const images_gallery = document.querySelector('.images_gallery')
const similar_wrap = document.querySelector('.similar_wrap')

getData(`https://api.themoviedb.org/3/movie/${id}?language=ru-RU`)
    .then(res => {
        console.log(res.data);
        movieName = res.data.title
        movieRelease = res.data.release_date
        movieRating = +res.data.vote_average.toFixed(1)

        backdrop.style.background = `url(https://image.tmdb.org/t/p/original${res.data.backdrop_path}) no-repeat center / cover`
        poster.src = res.data.poster_path ? `https://image.tmdb.org/t/p/original${res.data.poster_path}` : '/public/images/404poster.jpg'
        movie_name.innerHTML = res.data.title
        movie_name_orig.innerHTML = res.data.original_title
        score.innerHTML = +res.data.vote_average.toFixed(1)
        desc.innerHTML = res.data.overview
        scorePercent.innerHTML = `Рейтинг ожиданий ${+res.data.vote_average.toFixed(1) * 10}%`
        scoreFill.style.width = `${+res.data.vote_average.toFixed(1) * 10}%`
        trailer_name.innerHTML = res.data.title


        reloadInfo(res.data, info_wrap)
    })

getData(`https://api.themoviedb.org/3/movie/${id}/credits?language=ru-RU`)
    .then(res => {
        reloadRoles(res.data.cast.slice(0, 10), in_role_grid)
    })

getData(`https://api.themoviedb.org/3/movie/${id}/videos?language=ru-RU`)
    .then(res => {
        if (res.data.results.length > 0) {
            let trailer = res.data.results.find(el => el.type === 'Trailer' || el.type === 'Teaser')
            trailer_src.src = `https://www.youtube.com/embed/${trailer.key}`
        } else {
            getData(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-EN`)
                .then(res => {
                    let trailer = res.data.results.find(el => el.type === 'Trailer' || el.type === 'Teaser')
                    trailer_src.src = `https://www.youtube.com/embed/${trailer.key}`
                })
        }

    })

getData(`https://api.themoviedb.org/3/movie/${id}/images`)
    .then(res => {
        posters_box.innerHTML = ''
        images_gallery.innerHTML = ''

        for (let item of res.data.posters.slice(0, 4)) {
            posters_box.innerHTML += `
            <img src="https://image.tmdb.org/t/p/original${item.file_path}" alt="">
            `
        }

        for(let item of res.data.backdrops.slice(0, 6)) {
            images_gallery.innerHTML += `
            <div class="photo" style="background: url(https://image.tmdb.org/t/p/original${item.file_path}) no-repeat center / cover;"></div>
            `
        }
    })

getData(`https://api.themoviedb.org/3/movie/${id}/similar?language=ru-RU&page=1`)
    .then(res => reloadMovies(res.data.results.slice(0, 4), similar_wrap))