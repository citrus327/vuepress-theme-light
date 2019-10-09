<template>
  <div class="vuepress-theme-light__posts-list">
    <p style="display: flex; align-items: center; justify-content: flex-end;">
      Tags: &nbsp;<Tags @click="selectTag" :selected-tag="currentTag"/>
    </p>
    <ul>
      <li 
        v-for="page in pages" 
        :key="page.path"
        class="vuepress-theme-light__post" 
      >
        <div class="vuepress-theme-light__post__title" @click="$router.push(page.path)">
         {{ page.frontmatter.title || page.title || '无题' }}
        </div>
        <span style="font-size: 0.7em; margin-left: auto; margin-right: 10px;">
           <Badge v-for="tag in page.frontmatter.tags" :text="tag" type="error"/>
         </span>
        <div class="vuepress-theme-light__post__created">
          {{ page.lastUpdated | formatDate }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Tags from './tags'
import { isArray, isString, formatDate } from './utils'

export default {
  name: 'PostList',
  components: {
    Tags
  },
  filters: {
    formatDate (v) {
      return v ? formatDate(v, 'yyyy-MM-dd') : ''
    }
  },
  data () {
    return {
      currentTag: null
    }
  },
  computed: {
    pages () {
      return this.$site.pages.filter((page) => {
        let filtered = true
        if (this.currentTag !== null) {
          const tags = page.frontmatter.tags
          if (isArray(tags)) {
            filtered = tags.indexOf(this.currentTag) !== -1
          } else if (isString(tags)) {
            filtered = tags === this.currentTag
          }
        }

        return page.path !== '/' && filtered
      })
    }
  },
  methods: {
    selectTag (e) {
      if (this.currentTag && this.currentTag === e) {
        this.currentTag = null
      } else {
        this.currentTag = e
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .vuepress-theme-light__posts-list
    font-size 18px
    ul, li
      list-style: none;
      padding: 0;
    li + li
      margin-top: 24px;
    li
      display: flex;
      justify-content: space-between;
      align-items: center;
      .vuepress-theme-light__post__created 
        font-size: 14px;

      .vuepress-theme-light__post__title
        max-width: 70%;
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        &:hover 
          cursor: pointer;
          text-decoration: underline;
        
</style>