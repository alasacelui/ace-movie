import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/popular-movies',
    name: 'PopularMovie',
    component: () => import('../views/movies/PopularMovie.vue')
  },
  {
    path: '/upcoming-movies',
    name: 'UpcomingMovie',
    component: () => import('../views/movies/UpcomingMovie.vue')
  },
  {
    path: '/now-playing-movies',
    name: 'NowPlayingMovie',
    component: () => import('../views/movies/NowPlayingMovie.vue')
  },
  {
    path: '/top-rated-movies',
    name: 'TopRatedMovie',
    component: () => import('../views/movies/TopRatedMovie.vue')
  },
  {
    path: '/popular-tv-shows',
    name: 'PopularTv',
    component: () => import('../views/tv/PopularTv.vue')
  },
  {
    path: '/airing-tv-shows',
    name: 'AiringTv',
    component: () => import('../views/tv/AiringTv.vue')
  },
  {
    path: '/popular-people',
    name: 'PopularPeople',
    component: () => import('../views/people/PopularPeople.vue')
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
