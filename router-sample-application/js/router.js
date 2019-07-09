import UserList from 'userList'
import UserDetail from 'userDetail'
import Auth from 'auth'
import Login from 'login'
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
}).$mound('#app')