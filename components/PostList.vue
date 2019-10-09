<template>
  <div class="vuepress-theme-light__posts-list">
    <p class="tags">
      Tags: &nbsp;<Tags @click="selectTag" :selected-tag="currentTag"/>
    </p>
    <ul>
      <li 
        v-for="page in pages" 
        :key="page.path"
        class="vuepress-theme-light__post" 
      >
        <div 
          class="vuepress-theme-light__post__title" 
          @click="$router.push(page.path)"
          :title="page.frontmatter.title || page.title || '无题'"
        >
         {{ page.frontmatter.title || page.title || '无题' }}
        </div>
        <span class="vuepress-theme-light__post__tag">
           {{ page.frontmatter.tags}}
         </span>
        <div class="vuepress-theme-light__post__created">
          {{ page.date }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Tags from './tags'
import { isArray, isString, formatDate} from './utils'

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
      }).map((page) => ({
        ...page,
        date: formatDate(page.frontmatter.date || page.lastUpdated, 'yyyy-MM-dd')
      })).sort((a, b) => {
        const getDate = (page) => new Date(page.date)
        
        if (getDate(a) > getDate(b)) {
          return -1
        } else {
          return 1
        }
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
    .tags
      margin: 0;
      display: flex;
      align-items: center;
      justify-content:
      flex-end;
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

      .vuepress-theme-light__post__tag
        font-size: 0.7em;
        margin-left: auto;
        margin-right: 10px;

      .vuepress-theme-light__post__title
        max-width: 70%;
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        &:hover 
          cursor: pointer;
          text-decoration: underline;

  @media screen and (max-width: 767px) 
    .vuepress-theme-light__post__tag
      display none
    .vuepress-theme-light__post__created 
      display none
    .vuepress-theme-light__post__title
      max-width: 100% !important
    .tags
      display none !important
  
  @media screen and (min-width: 768px) and (max-width: 1023px) 
    .vuepress-theme-light__post__tag
      display none
    .vuepress-theme-light__post__created 
      display none
    .vuepress-theme-light__post__title
      max-width: 100% !important

  @media screen and (min-width: 1024px) and (max-width: 1279px)
    .vuepress-theme-light__post__tag
      display none
    .vuepress-theme-light__post__title
      max-width: 80% !important
    



  
</style>