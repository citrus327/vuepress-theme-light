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
    margin: 0;
    padding: 24px 0px;
    list-style: none;

    li.vuepress-theme-light__nav
      font-size: calc(10px + 1vw);
      font-weight: bolder;
      display: inline-block;
      transition: opacity linear 100ms 0ms;
      &:hover
        cursor: pointer;
        opacity: 0.5;

    li.vuepress-theme-light__nav + li.vuepress-theme-light__nav
      margin-left: 36px;
</style>