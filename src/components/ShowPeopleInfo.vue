<template>
  <div>
      <v-dialog v-if="showPeople" v-model="open" @input="hide" width="600" transition="dialog-bottom-transition">
        <v-card>
                <v-img class="white--text align-end" :src="`${imgProcess(showPeopleInfo.profile_path)}`" :lazy-src="`${imgProcess(showPeopleInfo.profile_path)}`" height="350px"
                gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)" position="center">
                <v-card-title class="display-1 font-weight-bold float-right">
                    <v-chip large label dark color="cyan" v-if="showPeopleInfo.imdb_id" :href="`https://www.imdb.com/name/${showPeopleInfo.imdb_id}`" target="_blank">
                          Follow
                        <v-icon class="ml-1" rigth medium>
                            mdi-bell
                        </v-icon>
                    </v-chip>
                 
                </v-card-title>
                    <!--Slot-->
                        <template v-slot:placeholder>
                        <v-row class="fill-height ma-0" align="center" justify="center">
                            <v-progress-circular indeterminate color="success lighten-2"></v-progress-circular>
                        </v-row>
                        </template>
                </v-img>

                <!--People Title-->
            <v-card-title class="headline font-weight-bold primary--text"> {{ showPeopleInfo.name }} </v-card-title>

            <v-card-text>
                <br>

                <p class="subtitle-1"> <span class="green--text">Biography :</span>  {{showPeopleInfo.biography}}</p>
                <p class=" overline">Birth Day: {{ formatDate(showPeopleInfo.birthday) }}</p>
                <p class="overline" v-if="showPeopleInfo.revenue > 0">Total Revenue: ${{ formatToThousand(showPeopleInfo.revenue) }}</p>
               
                <div>
                    <p class="overline">Known for
                        <v-icon small>mdi-tag</v-icon>
                    </p>
                      <v-chip-group>
                            <v-chip color="primary" small>
                                 {{showPeopleInfo.known_for_department}}
                            </v-chip>
                        </v-chip-group>
                </div>
      
            </v-card-text>

            <!--Slide Group (People Images )-->
                <v-sheet class="mx-auto pb-3" max-width="800" v-if="showPeopleInfo.images.profiles.length">
                    <p class="overline pt-1 pl-8 green--text m-0">Other Photos:</p>
                        <v-slide-group  class="pa-4 pt-0" center-active show-arrows>
                            <v-slide-item v-for="(image,i) in showPeopleInfo.images.profiles" :key="i" >
                                <v-card class="ma-4" height="150" width="120">
                                        <v-img :src="`${imgProcess(image.file_path)}`" :lazy-src="`${imgProcess}${image.file_path}`" contain :title="showPeopleInfo.name">
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

              <!--Slide Group (People Movie Credits )-->
           <v-sheet class="mx-auto pb-3" max-width="800" v-if="showPeopleInfo.movie_credits.cast.length">
               <p class="overline pt-1 pl-8 green--text m-0">List of Movies:</p>
                <v-slide-group  class="pa-4 pt-0" center-active show-arrows>
                    <v-slide-item v-for="(movie_credit,i) in showPeopleInfo.movie_credits.cast" :key="i" >
                        <v-card class="ma-4" height="220" width="180">
                                <v-img :src="`${imgProcess(movie_credit.poster_path)}`" :lazy-src="`${imgProcess}${movie_credit.poster_path}`" contain :title="movie_credit.title">
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
    props: ['showPeople', 'showPeopleInfo'],
    data() {
        return {
            showPeopleModal : this.showPeople, // populate the prop showPeople to this data property (showPeopleModal) ** we cannot mutate direct to the prop so we store to the data property
            // movie_cast: [] 
        }
    },
    methods: {
        hide() {
            // console.log('closing in the modal component')
            this.open = false
            this.$emit('closeModal') // emit a message to the parent 
        },
        imgProcess(img) {
            if(img) {
                return `https://image.tmdb.org/t/p/w780${img}`
             }
                return `/images/no_image.svg`
        }

    },
    computed: {
       open:{
           get() {
                 return this.showPeopleModal = true
           },
           set(value) {

                 return this.showPeopleModal = value
           }
       }
        
    },
  
}
</script>
