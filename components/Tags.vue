<template>
  <ul class="vuepress-theme-light__tags">
    <li 
      v-for="tag in tags" 
      @click="$emit('click', tag)"
      :class="{'selected': selectedTag === tag}"
    >
      {{ tag }}
    </li>
  </ul>
</template>

<script>
import { isArray, isString } from './utils'

export default {
  name: 'Tags',
  props: ['selectedTag'],
  computed: {
    tags () {
      return this.$site.pages.reduce((result, page) => {
        const tags = page.frontmatter.tags
        if (isArray(tags)) {
          result = result.concat(tags)
        } else if (isString(tags)){
          result.push(tags)
        }
        return [...new Set(result)]
      }, [])
    }
  }
}
</script>

<style lang="stylus" scoped>
  .vuepress-theme-light__tags
    display: inline-block;
    font-size: 0.8em;
    li
      display: inline-block;
      list-style: none;
      cursor: pointer;
      opacity 0.5
      transition opacity linear 80ms 0ms
      padding: 0px 2px;
      user-select: none;
      &:hover
        opacity 1
      &.selected
        background: #ccc;
        opacity: 1;
        border-radius: 3px;
    li + li 
      margin-left: 12px;
  
</style>