<template>
  <main class="page">

    <slot name="top" />

    <div class="hit">
      <img :src="hitUrl" alt="Hits bn" />
    </div>

    <Content class="theme-default-content" />

    <PageEdit />

    <PageNav v-bind="{ sidebarItems }" />

    <slot name="bottom" />
    <Comment />
  </main>
</template>

<script>
import PageEdit from '@theme/components/PageEdit.vue'
import PageNav from '@theme/components/PageNav.vue'
import Comment from '@theme/components/Comment.vue'

const baseURL = `https://junilhwang.github.io/TIL`

export default {
  components: { PageEdit, PageNav, Comment },

  props: ['sidebarItems'],

  data () {

    return {
      hitUrl: `https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=${baseURL}${this.$route.path}&count_bg=%230099FF&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=%EC%A1%B0%ED%9A%8C%EC%88%98&edge_flat=true`
    }

  },

  watch: {
    ['$route.path'] () {
      this.hitUrl = `https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=${baseURL}${this.$route.path}&count_bg=%230099FF&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=%EC%A1%B0%ED%9A%8C%EC%88%98&edge_flat=true`;
    }
  },

}
</script>

<style lang="stylus">
@require '../styles/wrapper.styl'

.page
  padding-bottom 2rem
  display block

</style>
