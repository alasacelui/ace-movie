<template>
  <div class="jumbotron">
      <v-container class="pa-16">
        <v-row>
          <v-col cols="12" lg="12" xl="6">
            <h1 :class="[$vuetify.breakpoint.mdAndUp ? 'display-4' : 'display-1']" class="font-weight-bold"> <span class="light-blue--text">Browse</span> Latest <br> <span  class="light-blue--text">Movies</span> Today !</h1>
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
  </div>
</template>

<script>

  export default {
    name: 'Home',
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
</style>