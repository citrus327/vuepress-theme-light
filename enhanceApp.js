import Layout from './layouts/Layout.vue'

export default ({ router }) => {
  router.addRoutes([
    {name: 'Home', path: '/', component: Layout},
    {name: 'Posts', path: '/posts/', component: Layout}
  ])
}