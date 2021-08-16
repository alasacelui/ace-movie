<template>
  <div class="mt-5">
    <v-container class="px-10">
       <ShowMovieInfo v-if="showMovie" :showMovie="showMovie" :showMovieInfo="showMovieInfo" @closeModal="closeModal"> </ShowMovieInfo>

      <v-row>
        <v-col>
          <h1 class="subheader ">Top Rated Movies 🎬</h1>
        </v-col>
        <v-col  cols="12" md="4" lg="2">
          <v-input>
            <v-text-field label="Search" prepend-icon="mdi-magnify" v-model="search_movie" @change="handleSearch(page)"></v-text-field>
          </v-input>
        </v-col>
      </v-row>
      <v-row class="py-5" v-if="tr_movies.length">
            <v-col class="d-flex" :class="{ custom2cols: $vuetify.breakpoint.xs,
                                            custom3cols: $vuetify.breakpoint.sm,
                                            custom5cols: $vuetify.breakpoint.mdAndUp}" 
                                            v-for="movie in tr_movies" :key="movie.id"
                                             @click.stop="openModal(movie.id)">
                                            
              <v-card class="d-flex flex-column" hover>
                <v-img :src="`${imgProcess(movie.poster_path)}`" :lazy-src="`${imgProcess(movie.poster_path)}`">
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
import ShowMovieInfo from '@/components/ShowMovieInfo'
export default {
  components:{ShowMovieInfo},
  data() {
    return {
      tr_movies: [],
      page:1,
      length:100,
      showMovie: false,
      showMovieInfo: [],
      search_movie: '',
      query_param: 'movie/top_rated' //search/movie
    }
  },
  methods: {
    async getTopRatedMovies(page) {
        const res = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=59b2f04f78d1977273c115fc826eb437&language=en-US&page=${page}`)
        const {results} = await res.json()
        this.tr_movies = results
    },
    async handleSearch(page) {

    //check if there is a search value  if it does then use the handleSearch() else revert to the getPopularPeople(page)
    if(this.search_movie) 
    {
      
      this.query_param = 'search/movie'
      const response = await fetch(`https://api.themoviedb.org/3/${this.query_param}?api_key=59b2f04f78d1977273c115fc826eb437&query=${this.search_movie}&language=en-US&page=${page}`)
      const results = await response.json()
      this.tr_movies = results.results
      this.length = results.total_pages

    } else {
        this.query_param = 'search/movie'
        this.length = 100 
        this.getTopRatedMovies(this.page)
    }
  },
    handlePagination(value) {

    this.page = value

     if(this.query_param == 'movie/top_rated') {  // check if its comming from the search box or its comming from the default page

         this.getTopRatedMovies(this.page)
        
      } else {

          this.handleSearch(this.page)

      }


    },
     async openModal(movie) {
      // console.log('opened')
      //query the individual movie by movie_id
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movie}?api_key=59b2f04f78d1977273c115fc826eb437&language=en-US&append_to_response=videos,images,recommendations,credits`)
      const  data = await response.json()
      this.showMovieInfo = data // append the fetches result data
      this.showMovie = true

    },
    closeModal() {
      // console.log('closed')
      this.showMovie = false
    },
    imgProcess(img) {

      if(img) {
          return `https://image.tmdb.org/t/p/w500${img}`
      }
      
      return `/images/no_image.svg`
    }

  },
  mounted() {
    this.getTopRatedMovies(this.page)
  }
}
</script>

<style>

</style>