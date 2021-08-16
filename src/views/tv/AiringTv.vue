<template>
    <div class="mt-5">
    <v-container class="px-10">
      <ShowTvShowsInfo v-if="showTvShows" :showTvShows="showTvShows" :showTvShowsInfo="showTvShowsInfo" @closeModal="closeModal"> </ShowTvShowsInfo>

       <v-row>
          <v-col>
            <h1 class="subheader ">Airing Tv Shows 📺</h1>
          </v-col>
          <v-col  cols="12" md="4" lg="2">
            <v-input>
              <v-text-field label="Search" prepend-icon="mdi-magnify" v-model="search_tv_shows" @change="handleSearch(page)"></v-text-field>
            </v-input>
          </v-col>
       </v-row>
      <v-row class="py-5" v-if="airing_tv_shows.length">
            <v-col class="d-flex" :class="{ custom2cols: $vuetify.breakpoint.xs,
                                            custom3cols: $vuetify.breakpoint.sm,
                                            custom5cols: $vuetify.breakpoint.mdAndUp}" 
                                            v-for="tv_shows in airing_tv_shows" :key="tv_shows.id"
                                            @click.stop="openModal(tv_shows.id)">

              <v-card class="d-flex flex-column" hover>
                <v-img :src="`${imgProcess(tv_shows.poster_path)}`" :lazy-src="`${imgProcess(tv_shows.poster_path)}`">
                  <!--Slot-->
                    <template v-slot:placeholder>
                      <v-row class="fill-height ma-0" align="center" justify="center">
                        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                      </v-row>
                    </template>
                </v-img>
                <v-card-title>
                  <p class="body-1">{{ tv_shows.name }}</p>
                </v-card-title>
                    <v-spacer></v-spacer>
                <v-card-actions class="justify-between">
                      <v-btn small  text dark class="orange">{{ tv_shows.vote_average }}% IMDB</v-btn>
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
import ShowTvShowsInfo from '@/components/ShowTvShowsInfo'
export default {
  components:{ShowTvShowsInfo},
  data() {
    return {
      airing_tv_shows: [],
      page:1,
      length:100,
      showTvShows: false,
      showTvShowsInfo: [],
      search_tv_shows: '',
      query_param: 'tv/airing_today' //search/tv
    }
  },
  methods: {
    async getAiringTvShows(page) {
        const res = await fetch(`https://api.themoviedb.org/3/${this.query_param}?api_key=59b2f04f78d1977273c115fc826eb437&language=en-US&page=${page}`)
        const {results} = await res.json()
        this.airing_tv_shows = results
    },
    async handleSearch(page) {

      //check if there is a search value  if it does then use the handleSearch() else revert to the getPopularPeople(page)
      if(this.search_tv_shows) 
      {
        this.query_param = 'search/tv'
        const response = await fetch(`https://api.themoviedb.org/3/${this.query_param}?api_key=59b2f04f78d1977273c115fc826eb437&query=${this.search_tv_shows}&language=en-US&page=${page}`)
        const results = await response.json()
        this.airing_tv_shows = results.results
        this.length = results.total_pages

      } else {
          this.query_param = 'search/movie'
          this.length = 100 
          this.getAiringTvShows(this.page)
      }
  },
    handlePagination(value) {

      this.page = value

      if(this.query_param == 'tv/airing_today') {  // check if its comming from the search box or its comming from the default page

         this.getAiringTvShows(this.page)
        
      } else {

          this.handleSearch(this.page)

      }

    },
    async openModal(tv) {
      // console.log('opened')

      //query the individual tvshow by tv_id
      const response = await fetch(`https://api.themoviedb.org/3/tv/${tv}?api_key=59b2f04f78d1977273c115fc826eb437&language=en-US&append_to_response=videos,images,recommendations,credits`)
      const  data = await response.json()
      this.showTvShowsInfo = data // append the fetches result data
      this.showTvShows = true // modal

    },
    closeModal() {
      // console.log('closed')
      this.showTvShows = false // modal
    },
    imgProcess(img) {
        if(img) {
            return `https://image.tmdb.org/t/p/w500${img}`
        }
        return `/images/no_image.svg`

    }
  
  },
  mounted() {
    this.getAiringTvShows(this.page)
  }
}
</script>