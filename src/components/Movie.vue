<template>
  <div class="card">
    <div class="position-absolute" style="right: 0">
      <button
        class="
          btn
          selectable
          text-secondary text-uppercase
          square-left square-bottom
          bg-dark
          fade-darken-60
        "
        title="add to favorites"
        @click="addToFavorites"
        v-if="!onMyList"
      >
        <i class="mdi mdi-star-outline f-24 text-secondary lighten-20"></i>
      </button>
      <button
        class="btn square-left square-bottom btn-warning"
        @click="remove"
        v-else
        title="remove from favorties"
      >
        <i class="mdi mdi-star f-24"></i>
      </button>
    </div>
    <img :src="movie.img" alt="" class="rounded-top movie-img" loading="lazy" />
    <div class="card-body">
      <div class="">
        <h3 class="d-flex align-items-center justify-content-between">
          <span>{{ movie.title }}</span>
          <span>{{ movie.score }}</span>
        </h3>
        <p class="clip-text">
          {{ movie.overview }}
        </p>
        <div class="text-center">
          <!-- Distinguish one modal from the next -->
          <button
            type="button"
            class="btn selectable text-secondary text-uppercase"
            data-bs-toggle="modal"
            :data-bs-target="'#m-' + movie.id"
            title="more details"
          >
            <i
              class="mdi mdi-chevron-up f-20"
              data-bs-toggle="modal"
              :data-bs-target="'#m-' + movie.id"
            ></i>
          </button>
        </div>
      </div>
    </div>
    <!-- Distinguish one modal from the next -->
    <Modal :id="'m-' + movie.id">
      <template #modal-title>
        {{ movie.title }}
      </template>
      <template #modal-body>
        <div class="text-center">
          <img :src="movie.img" alt="" />
        </div>
        <div class="row py-3">
          <div class="col-md-6 d-flex align-items-center">
            <p>
              {{ movie.overview }}
            </p>
          </div>
          <div class="col-md-6">
            <img :src="movie.poster2" alt="movie poster" class="img-fluid" />
          </div>
        </div>
      </template>
    </Modal>
  </div>
</template>


<script>
import { computed } from '@vue/reactivity'
import { Movie } from '../Models/Movie'
import { moviesService } from '../services/MoviesService'
import { myMoviesService } from '../services/MyMoviesService'
import Pop from '../utils/Pop'
import { AppState } from '../AppState'
export default {
  props: {
    movie: {
      type: Movie,
      required: true
    }
  },
  setup(props) {
    return {
      onMyList: computed(() => AppState.myMovies.find(m => m.id === props.movie.id)),
      addToFavorites() {
        myMoviesService.addMovie(props.movie)
        Pop.toast(`Added ${props.movie.title} to Favorites`, 'success')
      },
      async remove() {
        if (await Pop.confirm()) {
          myMoviesService.removeMovie(props.movie.id)
          Pop.toast(`Added ${props.movie.title} to Favorites`, 'success')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>