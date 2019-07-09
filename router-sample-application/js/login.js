import Auth from 'auth'

// ログインコンポーネント
const Login = {
  template: '#login',
  data: function() {
    return {
      email: 'vue@example.com',
      pass: '',
      error: false
    }
  },
  methods: {
    login: function() {
      Auth.login(this.email, this.pass, (function(loggedIn) {
        if (!loggedIn) {
          this.error = true
        } else {
          // redirectパラメータが付いている場合はそのパスに遷移
          this.$router.replace(this.$route.query.redirect || '/')
        }
      }).bind(this))
    }
  }
}