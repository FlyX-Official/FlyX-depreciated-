<template>
  <div class="posts">
    <h1>Posts</h1>
    <h3>This is a test for connecting Vue.js to Express.js</h3>
    <hr>
    <div v-for="post in posts" :key="post.id">
      <p>
        <span><b>{{ post.title }}</b></span><br />
        <span>{{ post.description }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import PostsService from '@/services/PostsService'
export default {
  name: 'posts',
  data () {
    return {
      posts: []
    }
  },
  mounted () {
    this.getPosts()
  },
  methods: {
    async getPosts () {
      const response = await PostsService.fetchPosts()
      this.posts = response.data
    }
  }
}

</script>
