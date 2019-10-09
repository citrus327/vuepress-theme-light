<template>
  <div>
    <Navbar/>
    <PostList v-if="$route.path === '/posts/'"/>
    <Content v-else style="width: 100%;"/>
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