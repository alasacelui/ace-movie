<template>
  <div>
    <!--section-one -->
    <section class="jumbotron">
      <v-container class="pa-16 pb-5">
        <v-row>
          <v-col cols="12" lg="12" xl="6">
            <h1 :class="[$vuetify.breakpoint.mdAndUp ? 'display-4' : 'display-1']" class="font-weight-bold"> <span class="light-blue--text">Browse</span> Latest <br> <span  class="light-blue--text">Movies</span> Today 🎬 !</h1>
            <p class="overline">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam sapiente odio accusantium dignissimos libero eligendi nobis ipsam, delectus neque officiis? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore, distinctio!</p>
            <v-btn large color="primary">
              Read More
            </v-btn>
          </v-col>
          <v-col class='hidden-sm-and-down' lg="12" xl="6">
            <v-img src="images/jwick.jpg" lazy-src="images/jwick.jpg" max-height="500" max-width="650" contain>

                <template v-slot:placeholder>
                  <v-row class="fill-height ma-0" align="center" justify="center">
                    <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                 </v-row>
                </template>
            </v-img>
          </v-col>
        </v-row>
      </v-container>
    </section>

    
     <!--section-two Latest MOVIE-->
    <section class="jumbotron">
      <v-container class="pa-16 pt-2">
        <h1 class="display-1">Latest Movies</h1> <br>
        <v-row>
          <v-col class="d-flex" :class="{   custom1cols: $vuetify.breakpoint.xs,
                                            custom3cols: $vuetify.breakpoint.sm,
                                            custom4cols: $vuetify.breakpoint.md,
                                            custom8cols: $vuetify.breakpoint.lgAndUp}" 
                                            v-for="movie in popular_movies" :key="movie.id"
                                            >
            <v-hover v-slot:default="{ hover }">      
              <v-card class="d-flex flex-column" hover>
                <v-img :src="`${imgProcess(movie.poster_path)}`" :lazy-src="`${imgProcess(movie.poster_path)}`" :title="movie.title">

                    <v-expand-transition>
                        <div v-if="hover" class="d-flex transition-fast-in-fast-out cyan darken-2 v-card--reveal display-1 white--text" style="height: 100%;">
                          <v-icon large>
                            mdi-play-circle
                          </v-icon>
                        </div>
                    </v-expand-transition>

                    <template v-slot:placeholder>
                      <v-row class="fill-height ma-0" align="center" justify="center">
                        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                      </v-row>
                    </template>
                </v-img>
                <v-card-title>
                  <p class="body-2">{{ movie.title }}</p>
                </v-card-title>
                    <v-spacer></v-spacer>
                <v-card-actions class="justify-between">
                      <v-btn small  text dark class="cyan ml-auto">{{ movie.vote_average }}% </v-btn>
                </v-card-actions>
              </v-card>
            </v-hover>
            </v-col>
           
        </v-row>
      </v-container>
    </section>


  <!--section-three Top Rated MOVIE-->
    <section class="jumbotron">
      <v-container class="pa-16 pt-2">
        <h1 class="display-1">Top Rated Movies</h1> <br>
        <v-row>
          <v-col class="d-flex" :class="{   custom1cols: $vuetify.breakpoint.xs,
                                            custom3cols: $vuetify.breakpoint.sm,
                                            custom4cols: $vuetify.breakpoint.md,
                                            custom8cols: $vuetify.breakpoint.lgAndUp}" 
                                            v-for="movie in top_rated_movies" :key="movie.id"
                                            >
            <v-hover v-slot:default="{ hover }">      
              <v-card class="d-flex flex-column" hover>
                <v-img :src="`${imgProcess(movie.poster_path)}`" :lazy-src="`${imgProcess(movie.poster_path)}`" :title="movie.title">

                    <v-expand-transition>
                        <div v-if="hover" class="d-flex transition-fast-in-fast-out cyan darken-2 v-card--reveal display-1 white--text" style="height: 100%;">
                          <v-icon large>
                            mdi-play-circle
                          </v-icon>
                        </div>
                    </v-expand-transition>

                    <template v-slot:placeholder>
                      <v-row class="fill-height ma-0" align="center" justify="center">
                        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                      </v-row>
                    </template>
                </v-img>
                <v-card-title>
                  <p class="body-2">{{ movie.title }}</p>
                </v-card-title>
                    <v-spacer></v-spacer>
                <v-card-actions class="justify-between">
                      <v-btn small  text dark class="cyan ml-auto">{{ movie.vote_average }}% </v-btn>
                </v-card-actions>
              </v-card>
            </v-hover>
            </v-col>
           
        </v-row>
      </v-container>
    </section>

     <!--section-four LATEST TV Shows-->
    <section class="jumbotron">
      <v-container class="pa-16 pt-2">
        <h1 class="display-1">Latest Tv Shows</h1> <br>
        <v-row>
          <v-col class="d-flex" :class="{   custom1cols: $vuetify.breakpoint.xs,
                                            custom3cols: $vuetify.breakpoint.sm,
                                            custom4cols: $vuetify.breakpoint.md,
                                            custom8cols: $vuetify.breakpoint.lgAndUp}" 
                                            v-for="tv_shows in popular_tv_shows" :key="tv_shows.id"
                                            >
            <v-hover v-slot:default="{ hover }">                             
              <v-card class="d-flex flex-column" hover>
                <v-img :src="`${imgProcess(tv_shows.poster_path)}`" :lazy-src="`${imgProcess(tv_shows.poster_path)}`" :title="tv_shows.name">

                     <v-expand-transition>
                        <div v-if="hover" class="d-flex transition-fast-in-fast-out cyan darken-2 v-card--reveal display-1 white--text" style="height: 100%;">
                          <v-icon large>
                            mdi-play-circle
                          </v-icon>
                        </div>
                    </v-expand-transition>

                    <template v-slot:placeholder>
                      <v-row class="fill-height ma-0" align="center" justify="center">
                        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                      </v-row>
                    </template>
                </v-img>
                <v-card-title>
                  <p class="body-2">{{ tv_shows.name }}</p>
                </v-card-title>
                    <v-spacer></v-spacer>
                <v-card-actions class="justify-between">
                      <v-btn small  text dark class="cyan ml-auto">{{ tv_shows.vote_average }}% </v-btn>
                </v-card-actions>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
      </v-container>
    </section>
    

  </div>
  
</template>

<script>

  export default {
    name: 'Home',
    data() {
      return {
         popular_movies: [],
         top_rated_movies:[],
         popular_tv_shows: []
      }
    },
    methods:{
    imgProcess(img) {

        if(img) {
            return `https://image.tmdb.org/t/p/w500${img}`
        }
        
        return `/images/no_image.svg`
      }
    },

  async mounted() {
      const popular_movies = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=59b2f04f78d1977273c115fc826eb437&language=en-US&page=1`)
      const results_movie = await popular_movies.json()
      this.popular_movies = results_movie.results.slice(0,16)

      const top_rated_movies = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=59b2f04f78d1977273c115fc826eb437&language=en-US&page=1`)
      const results_top_rated_movie = await top_rated_movies.json()
      this.top_rated_movies = results_top_rated_movie.results.slice(0,16)

      const popular_tv_shows = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=59b2f04f78d1977273c115fc826eb437&language=en-US&page=1`)
      const results_tv = await popular_tv_shows.json()
     
      this.popular_tv_shows = results_tv.results.slice(0,16)


   }
  }
</script>

<style scoped>
.jumbotron {
    text-size-adjust: 100%;
    -webkit-tap-highlight-color: transparent;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    box-sizing: border-box;
    padding: 4rem 2rem;
    padding-right: 0px;
    padding-left: 0px;
    border-radius: 0px;
    margin: 0px !important;
    text-align: left !important;
    color: rgb(255, 255, 255) !important;
    background: rgb(0, 0, 0);
}
.v-card--reveal {
    align-items: center;
    bottom: 0;
    justify-content: center;
    opacity: .7;
    position: absolute;
    width: 100%;
}

.v-application--wrap {
    min-height: 100vh;
    justify-content: center;
}
</style>