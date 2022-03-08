import { AppState } from "../AppState"
import { Movie } from "../Models/Movie"
import { moviesApi } from "./AxiosService"

const baseQuery = {
  api_key: '545c6ef058e65396849dfbbf381cbca3',
  include_adult: false,
  page: 1,
  query: ''
}

class MoviesService {
  async search(searchTerm) {
    baseQuery.query = searchTerm
    const res = await moviesApi.get('', { params: baseQuery })
    const movies = res.data.results.map(m => new Movie(m))
    AppState.movies = movies
    AppState.totalPages = res.data.total_pages
  }

  async changePage(val) {
    let newPage = baseQuery.page + val
    if (newPage > 0 && newPage <= AppState.totalPages) {
      baseQuery.page = newPage
      const res = await moviesApi.get('', { params: baseQuery })
      const movies = res.data.results.map(m => new Movie(m))
      AppState.movies = movies
      AppState.currentPage = newPage
    }
  }
}

export const moviesService = new MoviesService()