import Auth from 'auth'

// ログインコンポーネント
const Login = {
  template: `
    <div>
      <p v-if="$route.query.redirect">ログインしてください</p>
      <form @submit.prevent="login">
        <label><input placeholder="email" v-model="email"></label>
        <label><input type="password" v-model="pass" placeholder="password"></label><br>
        <button type="submit">ログイン</button>
        <p v-if="error" class="error">ログインに失敗しました</p>
      </form>
    </div>
  `,
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

export default Login