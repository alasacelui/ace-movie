<template>
<!--Root-->
  <v-app>

    <!--Navigation Drawer-->
    <v-navigation-drawer v-model="drawer" absolute temporary color="teal" dark>
      <v-list nav>
        <v-subheader>Main Menu</v-subheader>

        <!--Home Page-->
        <v-list-item to="/" active-class="green white--text">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title > 
              Home 
              </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      
         <v-list-group v-for="(main_menu,i) in menu" :key="i" :prepend-icon="main_menu.icon" active-class="teal white--text">


          <!--dropdown activator (SLOT) -->
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="main_menu.title"></v-list-item-title>
            </v-list-item-content>
          </template>

          <!--Child Item-->
          <v-list-item v-for="(sub_menu,i) in main_menu.sub_menu" :key="i" :to="sub_menu.route" active-class="green white--text">
            <v-list-item-content>
              <v-list-item-title v-text="sub_menu.title"> </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

         </v-list-group>

     
      </v-list>

    </v-navigation-drawer>

    <!--Navbar-->
    <v-app-bar app flat color="black px-10" >

          <v-app-bar-nav-icon color="white" class="hidden-md-and-up" @click="drawer = true">

          </v-app-bar-nav-icon>
          <v-img src="/images/brand-logo.svg"  class="mx-3 " contain max-width="40" max-height="40"></v-img>

          <router-link to="/" class="white--text text-decoration-none">
            <v-app-bar-title>Ace Movie</v-app-bar-title>
          </router-link>
     
        <v-spacer></v-spacer>

        <!--Main Menu-->
        <div class="hidden-sm-and-down">
        <v-menu offset-y transition="scale-transition" dark v-for="(main_menu,i) in menu" :key="i">
         <template v-slot:activator="{ on, attrs }">
            <v-btn text  dark v-bind="attrs" v-on="on">
              {{main_menu.title}}
            </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(sub_menu, i) in main_menu.sub_menu" :key="i" :to="sub_menu.route">
            <v-list-item-title >{{ sub_menu.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
        </v-menu>

        </div>
      
    </v-app-bar>

        <v-main>
          <!--Section Content-->
          <router-view/>
        </v-main>

          <v-footer color="teal " padless>
            <v-row justify="center" no-gutters>
              <v-btn v-for="link in links" :key="link" color="white" text rounded class="my-2">
                {{ link }}
              </v-btn>
              <v-col
                class="teal py-4 text-center white--text" cols="12">
                {{ new Date().getFullYear() }} — <strong>Ace Movie 🍿</strong>
              </v-col>
            </v-row>
         </v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
         drawer: false,
        
        menu:[
          {
            title:'Movie',
            sub_menu:[
                        {title:'Popular', route:{name:'PopularMovie'}},
                        {title:'Upcoming Movies', route:{name:'UpcomingMovie'}},
                        {title:'Now Playing', route:{name:'NowPlayingMovie'}},
                        {title:'Top Rated', route:{name:'TopRatedMovie'}} 
                     ],
            icon: 'mdi-movie-open-play'
          },
          {
            title:'Tv Shows',
            sub_menu:[
                        {title:'Popular', route:{name:'PopularTv'}},
                        {title:'Airing Today', route:{name:'AiringTv'}},
                     ],
            icon: 'mdi-television-classic'
          },
          {
            title:'People',
            sub_menu:[
                        {title:'Popular People', route:{name:'PopularPeople'}},
                     ],
            icon: 'mdi-account-search'
          }
        ],
        links: [
        'Home',
        'About',
        'Contact',
        'Portfolio',
        'Buy me a Coffee',
      ],
    }
   
  }
};
</script>
