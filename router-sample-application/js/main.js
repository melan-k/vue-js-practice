const Auth = {
  login: function(email, pass, cb) {
    // ダミーデータを使った疑似ログイン
    setTimeout(function() {
      if(email === 'vue@example.com' && pass === 'vue'){
        // ログイン成功時はローカルストレージにtokenを保存する
        localStorage.token = Math.random().toString(36).substring(7)
        if(cb) { cb(true) }
      } else {
        if(cb) { cb(false) }
      }
    }, 0)
  },

  logout: function() {
    delete localStorage.token
  },

  loggedIn: function() {
    // ローカルストレージにtokenがあればログイン状態とみなす
    return !!localStorage.token
  }
}

const userData = [
  {
    id: 1,
    name: 'Masaki Kishida',
    description: '宮崎で働くエンジニアです'
  },
  {
    id: 2,
    name: 'Chisa Sakamatsu',
    description: '宮崎で働く看護師です'
  }
]

// 擬似的にAPI経由で情報を取得したようにする
const getUsers = function(callback) {
  setTimeout(function() {
    callback(null, userData)
  }, 1000)
}

const getUser = function(userId, callback) {
  setTimeout(function() {
    const filterUsers = userData.filter(function(user) {
      return user.id === parseInt(userId, 10)
    })
    callback(null, filteredUsers && filteredUsers[0])
  }, 1000)
}

const UserList = Vue.extend({
  template: `
    <div>
      <div class="loading" v-if="loading">読み込み中...</div>
      <div v-if="error" class="error">{{ error }}</div>
      <div v-for="user in users" :key="user.id">
        <router-link :to="{ path: '/users/' + user.id }">{{ user.name }}</router-link>
      </div>
    </div>
  `,
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
})

const UserDetail = Vue.extend({
  template: `
    <div>
      <div class="loading" v-if="loading">読み込み中...</div>
      <div v-if="error" class="error">{{ error }}</div>
      <div v-if="user">
        <h2>{{ user.name }}</h2>
        <p>{{ user.description }}</p>
      </div>
    </div>
  `,
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
})

const UserCreate = Vue.extend({
  template: `
    <div>
      <div class="sending" v-if="sending">Sending...</div>
      <div>
        <label>名前:</label>
        <input type="text" v-model="user.name">
      </div>
      <div>
        <label>説明文:</label>
        <textarea v-model="user.description"></textarea>
      </div>
      <div v-if="error" class="error">
        {{ error }}
      </div>
      <div>
        <input type="button" @click="createUser" value="送信">
      </div>
    </div>
  `,
  data: function() {
    return {
      sending: false,
      user: this.defaultUser(),
      error: null
    }
  },
  created: function() {
  },
  methods: {
    defaultUser: function() {
      return {
        name: '',
        description: ''
      }
    },
    createUser: function() {
      // 入力パラメータのバリデーション
      if(this.user.name.trim() === '') {
        this.error = 'Nameは必須です'
        return
      }
      if(this.user.description.trim() === '') {
        this.error = 'Descriptionは必須です'
        return
      }
      postUser(this.user, (function(err, user) {
        this.sending = false
        if(err) {
          this.error = err.toString()
        } else {
          this.error = null
          // デフォルトでフォームをリセット
          this.user = this.defaultUser()
          alert('新規ユーザが登録されました')
          // ユーザ一覧ページに戻る
          this.$router.push('/users')
        }
      }).bind(this))
    }
  }
})

// ログインコンポーネント
const Login = Vue.extend({
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
})

// ルートオプションを渡してルーターインスタンスを作成
const router = new VueRouter({
  // 各ルートにコンポーネントをマッピング
  // コンポーネントは Vue.extend() によって作られたコンポーネントコンストラクタでも
  // コンポーネントオプションのオブジェクトでも渡せる
  routes: [
    {
      path: '/path',
      component: {
        template: '<div>トップページです</div>'
      }
    },
    {
      path: '/users',
      component: UserList
    },
    {
      path: '/users/new',
      component: UserCreate,
      beforeEnter: function(to, from, next) {
        // 認証されていない状態でアクセスした時はloginページに遷移する
        if(!Auth.loggedIn()) {
          next({
            path: '/login',
            query: { redirect: to.fullPath }
          })
        } else {
          // 認証済みであればそのまま新規ユーザ作成ページへ進む
          next()
        }
      }
    },
    {
      // /users/newの前にこのルートを定義するとパターンマッチにより/users/newが動作しなくなるので注意
      path: 'users/:userId',
      component: UserDetail
    },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/logout',
      beforeEnter: function(to, from, next) {
        Auth.logout()
        next('/top')
      }
    },
    {
      // 定義されていないパスへの対応．トップページへリダイレクトする
      path: '*',
      redirect: '/top'
    }
  ]
})

// ルーターのインスタンスをrootとなるVueインスタンスに渡す
const app = new Vue({
  data: {
    Auth: Auth
  },
  router: router
}).$mount('#app')