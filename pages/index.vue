<template>
  <div class="container">
    <div>
      <h1>Articles</h1>
      <ul>
        <li v-for="article in articles">
          {{ article.title }}, {{ article.content }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: 'Index',
  fetch ({ store }) {
    return Promise.all([
      store.dispatch('article/getArticleList'),
    ]);
  },
  computed: {
    ...mapState({
      articles: store => store.article.articleList,
    }),
  },
}
</script>

<style>
</style>
