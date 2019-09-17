<template>
  <div>
    <Navbar/>
    <PostList v-if="$route.path === '/posts/'"/>
    <Content v-else/>
  </div>
</template>

<script>
import PostList from '../components/PostList'
import Navbar from '../components/Navbar'
import Me from '../components/Me'
export default {
  name: 'Layout',
  components: { Navbar, PostList, Me }
}
</script>

<style>

</style>