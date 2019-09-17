<template>
  <div>
    <slot name="header"></slot>
    <p>
      <slot name="slogan"></slot>
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {

  },
  
})
</script>