import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import OlympicLayoutView from '@/views/event/OlympicLayoutView.vue'
import OlympicDetailView from '@/views/event/OlympicDetailView.vue'
import OlympicMetalView from '@/views/event/OlympicMetalView.vue'
import { useCountryStore } from '@/stores/country'
import CountryService from '@/services/CountryService'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/country/:id',
      name: 'country-layout',
      component: OlympicLayoutView,
      props: true,
      beforeEnter: (to) => {
        const id = parseInt(to.params.id as string)
        const countryStore = useCountryStore()
        return CountryService.getCountryById(Number(id))
          .then((response) => {
            countryStore.setCountry(response.data)
          })
          .catch((error) => {
            console.log(error)
            if (error.response && error.response.status === 404) {
              router.push({ name: '404-resource', params: { resource: 'passenger' } })
            } else {
              router.push({ name: 'network-error' })
            }
          })
      },
      children: [
        {
          path: '',
          name: 'olympic-detail',
          component: OlympicDetailView,
          props: true
        },
        {
          path: '',
          name: 'olympic-metal',
          component: OlympicMetalView,
          props: true
        }
      ]
    }
  ]
})

export default router
