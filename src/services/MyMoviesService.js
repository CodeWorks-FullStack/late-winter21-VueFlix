import { AppState } from "../AppState"

class MyMoviesService {

  loadMovies() {
    AppState.myMovies = JSON.parse(localStorage.getItem('my-movies')) || []
  }
  saveMovies() {
    localStorage.setItem("my-movies", JSON.stringify(AppState.myMovies))
  }


  addMovie(movie) {
    AppState.myMovies.push(movie)
    this.saveMovies()
  }

  removeMovie(movieId) {
    AppState.myMovies = AppState.myMovies.filter(m => m.id != movieId)
    this.saveMovies()
  }
}

export const myMoviesService = new MyMoviesService()