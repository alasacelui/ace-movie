<template>
  <div class="mt-5">
    <v-container class="px-10">
      <h1 class="subheader light-blue--text">Now Playing</h1> <br>
      <v-row class="py-5" v-if="np_movies.length">
            <v-col class="d-flex" :class="{ custom2cols: $vuetify.breakpoint.xs,
                                            custom3cols: $vuetify.breakpoint.sm,
                                            custom5cols: $vuetify.breakpoint.mdAndUp}" v-for="movie in np_movies" :key="movie.id">
                                            
              <v-card class="d-flex flex-column" hover>
                <v-img :src="`${imgProcess}${movie.poster_path}`" :lazy-src="`${imgProcess}${movie.poster_path}`">
                  <!--Slot-->
                    <template v-slot:placeholder>
                      <v-row class="fill-height ma-0" align="center" justify="center">
                        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                      </v-row>
                    </template>
                </v-img>
                <v-card-title>
                  <p class="body-1">{{ movie.title }}</p>
                </v-card-title>
                    <v-spacer></v-spacer>
                <v-card-actions class="justify-between">
                      <v-btn small  text dark class="orange">{{ movie.vote_average }}% IMDB</v-btn>
                      <v-btn small fab text dark color="grey" outlined class="ml-auto">
                        <v-icon>mdi-heart</v-icon>
                      </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
        <v-pagination :length="length" v-model="page" total-visible="5" class="mx-auto py-10" @input="handlePagination"></v-pagination>
      </v-row>


 
  
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      np_movies: [],
      page:1,
      length:100
    }
  },
  methods: {
    async getNowPlayingMovies(page) {
        const res = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=59b2f04f78d1977273c115fc826eb437&language=en-US&page=${page}`)
        const {results} = await res.json()
        this.np_movies = results
    },
    handlePagination(value) {
      this.page = value
      this.getNowPlayingMovies(this.page)
    }
  

  },
  computed: {
      imgProcess: () => {
            return 'https://image.tmdb.org/t/p/w500'
          },
  },
  mounted() {
    this.getNowPlayingMovies(this.page)
  }
}
</script>

<style>

</style>