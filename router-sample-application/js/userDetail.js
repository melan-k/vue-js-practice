const userdetail = Vue.extend({
  template: `
    <div>
      <div class="loading" v-if="loading">読み込み中...</div>
      <div v-if="error" class="error">{{ error }}</div>
      <div v-if="user">
        <h2>{{ user.name }}</h2>
        <p>{{ user.description }}</p>
      </div>
    </div>
  `
})

const UserDetail = {
  template: userdetail,
  data: function() {
    return {
      loading: false,
      user: null,
      error: null
    }
  },
  created: function() {
    this.fetchData()
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData: function() {
      this.loading = true
      // this.$route.params.userId に現在のURL上のパラメータに対応したUserIdが格納される
      getUser(this.$route.params.userId, (function(err, user) {
        this.loading = false
        if(err) {
          this.error = err.toString()
        } else {
          this.user = user
        }
      }).bind(this))
    }
  }
}