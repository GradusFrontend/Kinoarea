import axios from "axios"

const options = {
    headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4M2U2NzIyZDhmZmNmNzRkODllZjA0NDdiYzZhMTE3MiIsInN1YiI6IjY2MDg0ZmRlOGEwZTliMDE0OTRjODA5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GqI0pjw5wdAQA0bwTl5N2-AlXMUS-QObkcyDtJRa1is'
    }
}

export const getMovie = async (id) => {
    try {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}language=ru-RU`, options)

        return res
    } catch(e) {
        toaster(e.message, 'error')
    }
}

export const getImages = async (id) => {
    try {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}/images`, options)

        return res
    } catch(e) {
        toaster(e.message, 'error')
    }
}

export const getData = async (path) => {
    try {
        const res = await axios.get(path, options)

        return res
    } catch(e) {
        alert(e.message)
    }
}