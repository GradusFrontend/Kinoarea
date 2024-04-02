import {
    resolve
} from 'path'
import {
    defineConfig
} from 'vite'

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                movie: resolve(__dirname, 'pages/movie/index.html'),
                person: resolve(__dirname, 'pages/person/index.html'),
            },
        },
    },
})