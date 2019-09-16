<template>
  <ul class="vuepress-theme-light__navs">
    <router-link 
      v-for="nav in $themeConfig.nav"
      :key="nav.text"
      :to="nav.link"
      tag="li" 
      class="vuepress-theme-light__nav"
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

<style lang="stylus" scoped>
  .vuepress-theme-light__navs 
    list-style: none;

    li.vuepress-theme-light__nav
      display: inline-block;

    li.vuepress-theme-light__nav + li.vuepress-theme-light__nav
      margin-left: 20px;
      
</style>