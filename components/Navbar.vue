<template>
  <ul>
    <router-link 
      v-for="nav in $themeConfig.nav"
      :key="nav.text"
      :to="nav.link"
      tag="li" 
    >
      {{ nav.text }}
    </router-link>
  </ul>
</template>

<script>
export default {
  name: 'Navbar',
}
</script>

<style>

</style>