Vue.component('user-login', {
  template: '#login-template',
  data: function() {
    return {
      userid: '',
      password: ''
    }
  },
  methods: {
    login: function() {
      auth.login(this.userid, this.password)
    }
  }
})

const auth = {
  login: function(id, pass) {
    window.alert("userid:" + id + "\n" + "password:" + pass)
  }
}

new Vue({
  el: "#login-example"
});
