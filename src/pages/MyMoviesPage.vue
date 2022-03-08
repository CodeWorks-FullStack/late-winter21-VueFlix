<template>
  <div class="component">
    <h1>MY MOVIES PAGE</h1>
    {{ myMovies }}
  </div>
</template>


<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState'
import { onMounted } from '@vue/runtime-core'
import { myMoviesService } from '../services/MyMoviesService'

export default {
  setup() {
    // NOTE onMounted runs when the page is loaded
    // translation: Controller Constructor => OnMounted

    return {
      myMovies: computed(() => AppState.myMovies)
    }
  }
}
</script>


<style lang="scss" scoped>
</style>