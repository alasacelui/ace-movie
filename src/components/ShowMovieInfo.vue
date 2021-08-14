<template>
  <div>
      <v-dialog v-if="showMovie" v-model="open" @input="hide" width="600" transition="dialog-bottom-transition">
        <v-card>
                <v-img class="white--text align-end" :src="`${imgProcess(showMovieInfo.poster_path)}`" :lazy-src="`${imgProcess(showMovieInfo.poster_path)}`" height="350px"
                gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)" position="top">
                <v-card-title class="display-1 font-weight-bold float-right">
                    <v-chip large label dark color="warning" v-if="showMovieInfo.videos.results.length" :href="`https://www.youtube.com/watch?v=${showMovieInfo.videos.results[0].key}`" target="_blank">
                        <v-icon left>
                            mdi-play
                        </v-icon>
                          Watch Trailer
                    </v-chip>
                 
                </v-card-title>
                    <!--Slot-->
                        <template v-slot:placeholder>
                        <v-row class="fill-height ma-0" align="center" justify="center">
                            <v-progress-circular indeterminate color="success lighten-2"></v-progress-circular>
                        </v-row>
                        </template>
                </v-img>

                <!--Movie Title-->
            <v-card-title class="headline font-weight-bold primary--text"> {{ showMovieInfo.title }} </v-card-title>

            <v-card-text>
                <br>
               <p class="subtitle-1"> <span class="green--text">Overview:</span>  {{showMovieInfo.overview}}</p>
               <div class="d-flex justify-between">
                <p class="pt-3">Release Date: {{ showMovieInfo.release_date }}</p>

                <!--Tags-->
                <div class="ml-auto">
                    <v-chip-group>
                        <v-chip v-for="genre in showMovieInfo.genres" :key="genre.id" color="primary" small>
                            {{genre.name}}
                        </v-chip>
                    </v-chip-group>
                </div>
          
               </div>
      
            </v-card-text>

            <!--Slide Group-->
           <v-sheet class="mx-auto"  elevation="8" max-width="800">
               <p class="subtitle-1 pt-1 pl-8 green--text m-0">Movie Cast:</p>
                <v-slide-group  class="pa-4 pt-0" center-active show-arrows>
                    <v-slide-item v-for="cast in movie_cast" :key="cast.id" >
                        <v-card class="ma-4" height="120" width="100">
                                <v-img :src="`${imgProcess(cast.profile_path)}`" :lazy-src="`${imgProcess}${cast.profile_path}`" contain :title="cast.name">
                                    <!--Loader-->
                                     <template v-slot:placeholder>
                                        <v-row
                                        class="fill-height ma-0"
                                        align="center"
                                        justify="center"
                                        >
                                        <v-progress-circular
                                            indeterminate
                                            color="success lighten-2"
                                        ></v-progress-circular>
                                        </v-row>
                                    </template>
                                </v-img>
                        </v-card>
                    </v-slide-item>
                </v-slide-group>
            </v-sheet>

        </v-card>
      </v-dialog>
  </div>
</template>

<script>
export default {
    props: ['showMovie', 'showMovieInfo'],
    data() {
        return {
            showMovieModal : this.showMovie, // populate the prop showMovie to this data property (showMovieModal) ** we cannot mutate direct to the prop so we store to the data property
            movie_cast: [] 
        }
    },
    methods: {
        hide() {
            // console.log('closing in the modal component')
            this.open = false
            this.$emit('closeModal') // emit a message to the parent 
        },
        log(value) {
            console.log(value)
        },
       async getMovieCast() {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${this.showMovieInfo.id}/credits?api_key=59b2f04f78d1977273c115fc826eb437&language=en-US`)
            const {cast} = await response.json()
            this.movie_cast = cast
            
        },
        imgProcess(img) {
            if(img) {
                return `https://image.tmdb.org/t/p/w500${img}`
             }
                return `/images/no_img.jpg`

        }

    },
    computed: {
       open:{
           get() {
                 return this.showMovieModal = true
           },
           set(value) {

                 return this.showMovieModal = value
           }
       },
    },
   mounted() {
       this.getMovieCast()
    
    }

  
}
</script>
