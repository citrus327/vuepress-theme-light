<template>
  <div>
    <Navbar/>
    <PostList v-if="$route.path === '/posts/'"/>
    <template v-else-if="$route.path === '/'">
      <Content/>
    </template>
    <Content v-else/>
  </div>
</template>

<script>
import PostList from '../components/PostList'
import Navbar from '../components/Navbar'
export default {
  name: 'Layout',
  components: { Navbar, PostList }
}
</script>

<style>

</style>