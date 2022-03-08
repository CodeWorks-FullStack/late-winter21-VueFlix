<template>
  <form class="col-6" @submit.prevent="search">
    <div class="input-group m-3">
      <input
        type="date"
        class="form-control"
        placeholder="Movie Title..."
        aria-label="Movie Title..."
        v-model="query"
      />
      <button class="btn btn-success" type="submit">
        <i class="mdi mdi-magnify"></i>
      </button>
    </div>
  </form>
</template>


<script>
import { ref } from '@vue/reactivity'
import { moviesService } from '../services/MoviesService'
export default {
  setup() {
    const query = ref('')
    return {
      query,
      search() {
        moviesService.search(query.value)
      }
    }
  }
}
</script>

