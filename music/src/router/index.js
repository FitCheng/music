import Vue from 'vue'
import Router from 'vue-router'
import Rank from '@/components/rank/rank'
import Singer from '@/components/singer/singer'
import Search from '@/components/search/search'
import Recommend from '@/components/recommend/recommend'
import singerDetail from '@/components/singer/child/singer-detail'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/rank',
      name: 'Rank',
      component: Rank
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/singer',
      name: 'Singer',
      component: Singer,
      children: [
        {
          path: ':id',
          component: singerDetail
        }
      ]
    },
    {
      path: '/recommend',
      name: 'Recommend',
      component: Recommend
    }
  ]
})
