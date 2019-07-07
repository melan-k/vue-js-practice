const UserList = {
  template: '#user-list',
  data: function() {
    return {
      users: function() { return [] },
      error: null
    }
  },
  //「ページ遷移が行われて，コンポーネントが初期化される前」に呼び出される
  beforeRouteEnter: function(to, from, next) {
    getUsers((function(err, users) {
      if (err) {
        this.error = err.toString()
      } else {
        // next に渡す callback でコンポーネント自身にアクセス可
        next(function(vm) {
          vm.users = users
        })
      }
    }).bind(this))
  }
}

var router = new VueRouter({
  routes: [
    {
      path: '/',
      component: UserList
    },
    {
      path: '/top',
      component: {
        template: '<div>トップページです</div>'
      }
    },
    {
      path: '/users',
      component: UserList,
      beforeEnter: function (to, from, next) {
        if (to.query.redirect === 'true') {
          next('/top') 
        } else {
          next()
        }
      }
    },
    {
      path: '/users/:userId',
      name: 'user',
      component: {
        template: '<div>ユーザIDは {{ $route.params.userId }} です．</div>'
      }
    }
  ]
})

var app = new Vue({
  router: router
}).$mount('#app')