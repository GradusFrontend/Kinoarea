import { getData } from "./http"

export function reloadMovies(arr, place) {
    const body_backdrop = document.querySelector('.backdrop')

    place.innerHTML = ''

    for (let item of arr) {
        let block = document.createElement('a')
        block.classList.add('movie_card_link')
        block.href = `/pages/movie/?id=${item.id}`
        place.append(block)

        block.innerHTML += `
        <div class="movie_card">
            <img class="movie_poster" src=https://image.tmdb.org/t/p/original${item.poster_path} alt="">
            <div class="score"><span>${+item.vote_average.toFixed(1)}</span></div>
            <h3 class="movie_name">${item.title}</h3>
            <p class="genres">${item.release_date}</p>
        </div>
        `

        block.onmouseenter = () => {
            body_backdrop.style.background = `url(https://image.tmdb.org/t/p/original${item.backdrop_path}) no-repeat center / cover`
        }
    }
}


export function reloadTrailers(arr, place) {
    place.innerHTML = ''

    for (let item of arr) {
        let box = document.createElement('div')
        let backdrop = document.createElement('div')
        let play = document.createElement('div')
        let trailerName = document.createElement('h3')



        box.classList.add('trailer_btn')
        backdrop.classList.add('trailer_backdrop')
        play.classList.add('play_btn')
        trailerName.classList.add('trailer_name')

        place.append(box)
        box.append(backdrop, trailerName)
        backdrop.append(play)


        backdrop.style.background = `url(https://image.tmdb.org/t/p/original${item.backdrop_path}) no-repeat center / cover`

        box.onclick = () => {
            trailer_name_big.innerHTML = item.title
            getData(`https://api.themoviedb.org/3/movie/${item.id}/videos?language=ru-RU`)
                .then(res => {
                    if (res.data.results.length > 0) {
                        let trailer = res.data.results.find(el => el.type === 'Trailer' || el.type === 'Teaser')
                        trailer_src.src = `https://www.youtube.com/embed/${trailer.key}`
                    } else {
                        getData(`https://api.themoviedb.org/3/movie/${item.id}/videos?language=en-EN`)
                            .then(res => {
                                let trailer = res.data.results.find(el => el.type === 'Trailer' || el.type === 'Teaser')
                                trailer_src.src = `https://www.youtube.com/embed/${trailer.key}`
                            })
                    }

                })
        }
    }

    let trailer_name_big = document.querySelector('#trailer_name')
    let trailer_src = document.querySelector('.trailer_src')
    trailer_name_big.innerHTML = arr[0].title

    getData(`https://api.themoviedb.org/3/movie/${arr[0].id}/videos?language=ru-RU`)
        .then(res => {
            if (res.data.results.length > 0) {
                let trailer = res.data.results.find(el => el.type === 'Trailer' || el.type === 'Teaser')
                trailer_src.src = `https://www.youtube.com/embed/${trailer.key}`
            } else {
                getData(`https://api.themoviedb.org/3/movie/${arr[0].id}/videos?language=en-EN`)
                    .then(res => {
                        let trailer = res.data.results.find(el => el.type === 'Trailer' || el.type === 'Teaser')
                        trailer_src.src = `https://www.youtube.com/embed/${trailer.key}`
                    })
            }

        })
}

let topPlace = 2
export function topPersons(arr, arr2, place) {
    place.innerHTML = ''

    for (let item of arr) {
        let block = document.createElement('a')
        block.classList.add('person_block')
        block.href = `/pages/person/?id=${item.id}`
        block.style.background = item.profile_path ? `url(https://image.tmdb.org/t/p/original${item.profile_path}) no-repeat center / cover` : 'url(/public/images/not_found_photo_mini.jpg)'
        place.prepend(block)
        block.innerHTML += `
        <span class="top_person">${topPlace--}-е место</span>
        <h3 class="person_name">${item.name}</h3>
        <h4 class="person_age">${item.popularity.toFixed(1)}</h4>
        `
    }

    let blockOther = document.createElement('div')
    blockOther.classList.add('other_persons_block')
    place.append(blockOther)

    let top = 3
    for (let item of arr2) {
        blockOther.innerHTML += `
        <a href="/pages/person/?id=${item.id}" class="other_person">
        <div class="left">
            <h3 class="other_name">${item.name}</h3>
            <div class="person_age">${item.popularity.toFixed(1)}</div>
        </div>

        <span class="other_top">${top++}-е место</span>
        </a>
        `
    }
}

export function reloadGenres(arr, place) {
    place.innerHTML = ''

    for (let item of arr) {
        let genre = document.createElement('h4')
        genre.classList.add('genre_tab')
        genre.dataset.genre = item.id
        genre.innerHTML = item.name

        place.append(genre)



    }


    let allGenre = document.createElement('h4')
    allGenre.classList.add('genre_tab', 'genre_tab_active')
    allGenre.innerHTML = 'все'
    place.prepend(allGenre)
    allGenre.dataset.genre = 'all'
}

export function reloadInfo(arr, place) {
    place.innerHTML = ''

    place.innerHTML = `
    <div class="left_info">
    <div class="info_item">
        <h3 class="question">Год:</h3>
        <h3 class="answer">${arr.release_date}</h3>
    </div>
    <div class="info_item">
        <h3 class="question">Страна:</h3>
        <h3 class="answer">${arr.production_countries[0].name}</h3>
    </div>
    <div class="info_item">
        <h3 class="question">Слоган:</h3>
        <h3 class="answer"> - </h3>
    </div>
    <div class="info_item">
        <h3 class="question">Режиссер:</h3>
        <h3 class="answer"> - </h3>
    </div>
    <div class="info_item">
        <h3 class="question">Сценарий:</h3>
        <h3 class="answer"> - </h3>
    </div>
    <div class="info_item">
        <h3 class="question">Продюссер:</h3>
        <h3 class="answer"> - </h3>
    </div>
    <div class="info_item">
        <h3 class="question">Оператор:</h3>
        <h3 class="answer"> - </h3>
    </div>
    <div class="info_item">
        <h3 class="question">Композитор:</h3>
        <h3 class="answer"> - </h3>
    </div>
</div>

<div class="right_info">
    <div class="info_item">
        <h3 class="question">Художник:</h3>
        <h3 class="answer"> - </h3>
    </div>
    <div class="info_item">
        <h3 class="question">Монтаж:</h3>
        <h3 class="answer"> - </h3>
    </div>
    <div class="info_item">
        <h3 class="question">Жанр:</h3>
        <h3 class="answer">${arr.genres[0].name}, ${arr.genres[1].name}..</h3>
    </div>
    <div class="info_item">
        <h3 class="question">Сборы в мире:</h3>
        <h3 class="answer">${arr.revenue}$</h3>
    </div>
    <div class="info_item">
        <h3 class="question">Премьера (мир):</h3>
        <h3 class="answer">${arr.release_date}</h3>
    </div>
    <div class="info_item">
        <h3 class="question">Премьера (РФ):</h3>
        <h3 class="answer">${arr.release_date}</h3>
    </div>
    <div class="info_item">
        <h3 class="question">Возраст:</h3>
        <h3 class="answer">16+</h3>
    </div>
    <div class="info_item">
        <h3 class="question">Время:</h3>
        <h3 class="answer">${arr.runtime} мин.</h3>
    </div>
</div>
    `
}

export function reloadRoles(arr, place) {
    place.innerHTML = ''

    for (let item of arr) {
        place.innerHTML += `
        <a href="/pages/person/?id=${item.id}" class="role_item">
        <img src=${item.profile_path ? `https://image.tmdb.org/t/p/original${item.profile_path}` : '/public/images/not_found_photo_mini.jpg'} alt="">
        <h3 class="person_name">${item.name}</h3>
        <h4 class="role_name">${item.character}</h4>
        </a>
        `
    }
}

export function reloadPersonMovies(arr, place) {
    place.innerHTML = ''

    for (let item of arr) {
        place.innerHTML += `
        <div class="card">
        <div class="card_left">
            <img class="mini_poster" src="${item.poster_path ? `https://image.tmdb.org/t/p/original${item.poster_path}` : '/public/images/404poster.jpg'}" alt="">
            <div class="left_text">
                <h2>
                    ${item.title}
                </h2>
                <p class="gray">${item.original_title}</p>
                <p class="yellow">Боевик, триллер, драма, ...</p>
                <p class="actor ">${item.character}</p>
            </div>
        </div>
        <div class="card_right">
            <div class="reyting">
                <div class="item">
                    <p>${+item.vote_average.toFixed(1)}</p>
                    <span>TMDb</span>
                </div>
            </div>
            <div class="btn">
                <a href="/pages/movie/?id=${item.id}">
                    <button>
                        Карточка фильма
                    </button>
                </a>

            </div>
        </div>
        </div>
        `
    }
}

export function reloadMovieRes(arr, place) {
    place.innerHTML = ''

    for (let item of arr) {
        place.innerHTML += `
        <a href="/pages/movie/?id=${item.id}" class="res_movie_card">
        <div class="left_movie">
            <img src="${item.poster_path ? `https://image.tmdb.org/t/p/original${item.poster_path}` : '/public/images/404poster.jpg'}" alt="">
            <div class="res_movie_info">
                <h3 class="res_movie_name">${item.title}</h3>
                <h4 class="res_movie_name_orig">${item.original_title}</h4>
                <p class="res_movie_date">${item.release_date}</p>
            </div>
        </div>

        <div class="res_movie_rate"><span class="res_movie_rate_text">${+item.vote_average.toFixed(1)}</span></div>
        </a>
        `
    }
}

export function reloadPersonRes(arr, place) {
    place.innerHTML = ''

    for (let item of arr) {
        place.innerHTML += `
        <a href="/pages/person/?id=${item.id}" class="res_person_card">
        <div class="left_person">
            <img src="${item.profile_path ? `https://image.tmdb.org/t/p/original${item.profile_path}` : '/public/images/404poster.jpg'}" alt="">
            <div class="res_person_info">
                <h3 class="res_person_name">${item.name}</h3>
                <p class="res_person_job">${item.known_for_department}</p>
            </div>
        </div>
        </a>
        `
    }
}