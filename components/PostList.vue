<template>
  <div class="vuepress-theme-light__posts-list">
    <ul>
      <li 
        v-for="page in $site.pages" 
        :key="page.path"
        class="vuepress-theme-light__post" 
      >
        <div class="vuepress-theme-light__post__title" @click="$router.push(page.path)">
         {{ page.frontmatter.title || page.title }}
        </div>
        <span style="font-size: 0.7em; margin-left: auto; margin-right: 10px;">
           {{ page.frontmatter.tags}}
         </span>
        <div class="vuepress-theme-light__post__created">
          {{ page.lastUpdated | formatDate }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
function format (date, fmt) {
  const v = new Date(date)
  let o = { 
    "M+" : v.getMonth()+1,                 //月份 
    "d+" : v.getDate(),                    //日 
    "h+" : v.getHours(),                   //小时 
    "m+" : v.getMinutes(),                 //分 
    "s+" : v.getSeconds(),                 //秒 
    "q+" : Math.floor((v.getMonth()+3)/3), //季度 
    "S"  : v.getMilliseconds()             //毫秒 
  }; 
  if(/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (v.getFullYear() + "").substr(4 - RegExp.$1.length))
  }

  for(let k in o) {
    if(new RegExp("("+ k +")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length))); 
    }
  }

  return fmt;
}
export default {
  name: 'PostList',
  filters: {
    formatDate (v) {
      return v ? format(v, 'yyyy-MM-dd') : ''
    }
  },
  computed: {
    pages () {
      return this.$site.pages.filter(() => {
        
      })
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