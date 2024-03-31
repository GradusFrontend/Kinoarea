import { getData } from "./http"

export function reloadMovies(arr, place) {
    const body_backdrop = document.querySelector('.backdrop')

    place.innerHTML = ''

    for (let item of arr) {
        let block = document.createElement('a')
        block.classList.add('movie_card_link')
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

/* <div class="trailer_btn">
    <div class="trailer_btn">
        <div class="play_btn"></div>
    </div>
    <h3 class="trailer_name">Ubyuu ya teba</h3>
</div> */