const userlist = Vue.extend({
  template: `
    <div>
      <div class="loading" v-if="loading">読み込み中...</div>
      <div v-if="error" class="error">{{ error }}</div>
      <div v-for="user in users" :key="user.id">
        <router-link :to="{ path: '/users/' + user.id }">{{ user.name }}</router-link>
      </div>
    </div>
  `
})

const UserList = {
  template: userlist,
  data: function() {
    return {
      loading: false,
      users: function() {
        return []
      },
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
      getUsers((function(err, users) {
        this.loading = false
        if(err) {
          this.error = err.toString()
        } else {
          this.users = users
        }
      }).bind(this))
    }
  }
}
export default UserList