<template>
  <div>
      <v-dialog v-if="showTvShows" v-model="open" @input="hide" width="600" transition="dialog-bottom-transition">
        <v-card>
                <v-img class="white--text align-end" :src="`${imgProcess(showTvShowsInfo.poster_path)}`" :lazy-src="`${imgProcess(showTvShowsInfo.poster_path)}`" height="350px"
                gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)" position="top">
                <v-card-title class="display-1 font-weight-bold float-right">
                    <v-chip large label dark color="warning" v-if="showTvShowsInfo.videos.results.length" :href="`https://www.youtube.com/watch?v=${showTvShowsInfo.videos.results[0].key}`" target="_blank">
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

          
                <!--Tv Title-->
            <v-card-title class="headline font-weight-bold primary--text"> {{ showTvShowsInfo.name }} </v-card-title>

            <v-card-text>
                <br>

                <p class="subtitle-1"> <span class="green--text">Synopsis :</span>  {{showTvShowsInfo.overview}}</p>
                <p class=" overline">Release Date: {{ showTvShowsInfo.last_air_date }}</p>
                <p class="overline" v-if="showTvShowsInfo.revenue > 0">Total Revenue: ${{ formatToThousand(showTvShowsInfo.revenue) }}</p>
               
                <div>
                    <p class="overline">Tags
                        <v-icon small>mdi-tag</v-icon>
                    </p>
                      <v-chip-group>
                            <v-chip class="ma-1" v-for="genre in showTvShowsInfo.genres" :key="genre.id" color="primary" small>
                                {{genre.name}}
                            </v-chip>
                        </v-chip-group>
                </div>
      
            </v-card-text>

            <!--Slide Group (Tv Cast)-->
           <v-sheet class="mx-auto py-3"  elevation="8" max-width="800" v-if="tvshows_cast.length">
               <p class="subtitle-1 pt-1 pl-8 green--text m-0">Tv Show Cast:</p>
                <v-slide-group  class="pa-4 pt-0" center-active show-arrows>
                    <v-slide-item v-for="cast in tvshows_cast" :key="cast.id" >
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


                 <!--Slide Group (Recommended Movies )-->
           <v-sheet class="mx-auto pb-3" max-width="800" v-if="showTvShowsInfo.recommendations.results.length">
               <p class="overline pt-1 pl-8 green--text m-0">Recommended Tv Shows:</p>
                <v-slide-group  class="pa-4 pt-0" center-active show-arrows>
                    <v-slide-item v-for="recommendation in showTvShowsInfo.recommendations.results" :key="recommendation.id" >
                        <v-card class="ma-4" height="220" width="180">
                                <v-img :src="`${imgProcess(recommendation.poster_path)}`" :lazy-src="`${imgProcess}${recommendation.poster_path}`" contain :title="recommendation.name">
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
    props: ['showTvShows', 'showTvShowsInfo'],
    data() {
        return {
            showTvShowsModal : this.showTvShows, // populate the prop showTvShows to this data property (showTvShowsModal) ** we cannot mutate direct to the prop so we store to the data property
            tvshows_cast: [] 
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
       async getTvShowsCast() {
            const response = await fetch(`https://api.themoviedb.org/3/tv/${this.showTvShowsInfo.id}/credits?api_key=59b2f04f78d1977273c115fc826eb437&language=en-US`)
            const {cast} = await response.json()
            this.tvshows_cast = cast
            
        },
        imgProcess(img) {
            if(img) {
                return `https://image.tmdb.org/t/p/w780${img}`
             }
                return `/images/no_image.svg`

        }
        ,
         formatToThousand(val) {
            return val.toLocaleString();
        }

    },
    computed: {
       open:{
           get() {
                 return this.showTvShowsModal = true
           },
           set(value) {

                 return this.showTvShowsModal = value
           }
       },
    },
   mounted() {
       this.getTvShowsCast()
    }

  
}
</script>
