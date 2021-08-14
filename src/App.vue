<template>
<!--Root-->
  <v-app>

    <!--Navbar-->
    <v-app-bar app flat color="black">
          <v-img src="/images/brand-logo.svg"  class="mx-3" contain max-width="40" max-height="40"></v-img>

          <router-link to="/" class="white--text text-decoration-none">
            <v-app-bar-title>Ace Movie</v-app-bar-title>
          </router-link>
     
        <v-spacer></v-spacer>
        <!--Movie Menu-->
        <v-menu offset-y transition="scale-transition" dark>
         <template v-slot:activator="{ on, attrs }">
            <v-btn text  dark v-bind="attrs" v-on="on">
            Movies
            </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(title, index) in menu.movies" :key="index" :to="title.route">
            <v-list-item-title >{{ title.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
        </v-menu>

        <!--Tvshows Menu -->
         <v-menu offset-y transition="scale-transition" dark>
         <template v-slot:activator="{ on, attrs }">
            <v-btn text  dark v-bind="attrs" v-on="on">
            Tv Shows
            </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(title, index) in menu.tv" :key="index" :to="title.route">
            <v-list-item-title >{{ title.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
        </v-menu>

         <!--People Menu -->
         <v-menu offset-y transition="scale-transition" dark>
         <template v-slot:activator="{ on, attrs }">
            <v-btn text  dark v-bind="attrs" v-on="on">
            People
            </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(title, index) in menu.people" :key="index" :to="title.route">
            <v-list-item-title >{{ title.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
        </v-menu>
      
    </v-app-bar>
        <v-main>
          <!--Section Content-->
          <router-view/>
        </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
         menu: {
          movies:[
            {title:'Popular', route:{name:'PopularMovie'}},
            {title:'Upcoming Movies', route:{name:'UpcomingMovie'}},
            {title:'Now Playing', route:{name:'NowPlayingMovie'}},
            {title:'Top Rated', route:{name:'TopRatedMovie'}}
           ],
           tv:[
             {title:'Popular', route:{name:'PopularTv'}},
             {title:'Airing Today', route:{name:'AiringTv'}},
           ],
            people:[
            {title:'Popular People', route:{name:'PopularPeople'}},
          ]
      }
    }
   
  }
};
</script>
