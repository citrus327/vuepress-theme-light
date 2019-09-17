<template>
  <div>
    <ul>
      <li v-for="page in $site.pages" @click="$router.push(page.path)">
        <div>
          {{ page.frontmatter.title || page.title }}
        </div>
        <div>
          {{ page.frontmatter.data}}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'PostList',
  computed: {
    posts () {
      return this.$site.pages.map((page) => {
        return {
          title: page.frontmatter.title || page.title,
          created: page.frontmatter.date,
        }
      })
    }
  }
}
</script>

<style>

</style>