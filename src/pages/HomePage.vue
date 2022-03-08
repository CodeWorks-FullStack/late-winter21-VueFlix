<template>
  <div class="container">
    <div class="row">
      <SearchForm />
    </div>
    <div class="row">
      <div class="col d-flex">
        <i
          class="mdi mdi-chevron-left selectable"
          @click="changePage(-1)"
          title="Previous"
          :disabled="currentPage == 1"
        ></i>
        <p>Page {{ currentPage }} of {{ totalPages }}</p>
        <i
          class="mdi mdi-chevron-right selectable"
          @click="changePage(1)"
          title="Next"
          :disabled="currentPage === totalPages"
        ></i>
      </div>
    </div>
    <div class="row movies">
      <div class="col-lg-4" v-for="m in movies" :key="m.id">
        <!-- REVIEW PROPS -->
        <Movie :movie="m" class="my-2 elevation-2" />
        <!-- movies.forEach(m => Movie(m)) -->
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState'
import { moviesService } from '../services/MoviesService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
export default {
  name: 'Home',
  setup() {
    return {
      // Computed => .On
      movies: computed(() => AppState.movies),
      totalPages: computed(() => AppState.totalPages),
      currentPage: computed(() => AppState.currentPage),
      async changePage(val) {
        try {
          await moviesService.changePage(val)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>
