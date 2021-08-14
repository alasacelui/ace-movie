<template>
  <div class="mt-5">
    <v-container class="px-10">
      <ShowPeopleInfo v-if="showPeople" :showPeople="showPeople" :showPeopleInfo="showPeopleInfo" @closeModal="closeModal"> </ShowPeopleInfo>

      <h1 class="subheader light-blue--text">Popular People</h1> <br>
      <v-row class="py-5" v-if="popular_people.length">
            <v-col class="d-flex" :class="{ custom2cols: $vuetify.breakpoint.xs,
                                            custom3cols: $vuetify.breakpoint.sm,
                                            custom5cols: $vuetify.breakpoint.mdAndUp}" 
                                            v-for="people in popular_people" :key="people.id"
                                            @click.stop="openModal(people.id)">

              <v-card class="d-flex flex-column" hover>
                <v-img :src="`${imgProcess(people.profile_path)}`" :lazy-src="`${imgProcess(people.profile_path)}`">
                  <!--Slot-->
                    <template v-slot:placeholder>
                      <v-row class="fill-height ma-0" align="center" justify="center">
                        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                      </v-row>
                    </template>
                </v-img>
                <v-card-title>
                  <p class="body-1">{{ people.name }}</p>
                </v-card-title>
                    <v-spacer></v-spacer>
                <v-card-actions class="justify-between">
                      <v-btn small  text dark class="cyan lighten-1">{{ people.popularity }}% Liked</v-btn>
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
import ShowPeopleInfo from '@/components/ShowPeopleInfo'
export default {
  components:{ShowPeopleInfo},
  data() {
    return {
      popular_people: [],
      page:1,
      length:100,
      showPeople: false,
      showPeopleInfo: []
    }
  },
  methods: {
    async getPopularPeople(page) {
        const res = await fetch(`https://api.themoviedb.org/3/person/popular?api_key=59b2f04f78d1977273c115fc826eb437&language=en-US&page=${page}`)
        const {results} = await res.json()
        this.popular_people = results
    },
    handlePagination(value) {
      this.page = value
      this.getPopularPeople(this.page)
    },
    async openModal(person) {
      // console.log('opened')

      //query the individual people by people_id
      const response = await fetch(`https://api.themoviedb.org/3/person/${person}?api_key=59b2f04f78d1977273c115fc826eb437&language=en-US&append_to_response=images,movie_credits`)
      const  data = await response.json()
      this.showPeopleInfo = data // append the fetches result data
      this.showPeople = true

    },
    closeModal() {
      // console.log('closed')
      this.showPeople = false
    },
    imgProcess(img) {
    if(img) {
        return `https://image.tmdb.org/t/p/w500${img}`
    }
    return `/images/no_image.svg`

}
  
  },
  mounted() {
    this.getPopularPeople(this.page)
  }
}
</script>

<style>

</style>