import { getData } from "../../modules/http";
import { reloadMovies, reloadPersonMovies, reloadMovieRes, reloadPersonRes } from "../../modules/ui";

const id = location.search.split('=').at(-1)

const person_main_name = document.querySelector('.person_main_name')
const person_orig_name = document.querySelector('.person_orig_name')
const career = document.querySelector('.career')
const personHeight = document.querySelector('.personHeight')
const born_date = document.querySelector('.born_date')
const born_place = document.querySelector('.born_place')
const person_genres = document.querySelector('.person_genres')
const all_movies_count = document.querySelector('.all_movies_count')
const best_movies_wrap = document.querySelector('.films_flex')
const gallery_name = document.querySelector('.gallery_name')
const photos = document.querySelector('.photos')
const person_photo = document.querySelector('.person_photo')
const cards = document.querySelector('.cards')

getData(`https://api.themoviedb.org/3/person/${id}?language=ru-RU`)
    .then(res => {
        console.log(res.data);
        person_main_name.innerHTML = res.data.name
        person_orig_name.innerHTML = res.data.name
        gallery_name.innerHTML = res.data.name
        career.innerHTML = res.data.known_for_department
        personHeight.innerHTML = ' - '
        born_date.innerHTML = res.data.birthday
        born_place.innerHTML = res.data.place_of_birth
        person_genres.innerHTML = ' - '
        person_photo.src = `https://image.tmdb.org/t/p/original${res.data.profile_path}`
    })

getData(`https://api.themoviedb.org/3/person/${id}/movie_credits?language=ru-RU'`)
    .then(res => {
        reloadMovies(res.data.cast.slice(0, 4), best_movies_wrap)
        reloadPersonMovies(res.data.cast.slice(0, 20), cards)
    })

getData(`https://api.themoviedb.org/3/person/${id}/images`)
    .then(res => {
        photos.innerHTML = ''

        console.log(res.data);
        for (let item of res.data.profiles.slice(0, 6)) {
            photos.innerHTML += `
            <div class="item" style="background: url(https://image.tmdb.org/t/p/original${item.file_path}) no-repeat center / cover;"></div>
            `
        }
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
