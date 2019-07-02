var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  },
  methods: {
    TestMethod: function() {
      this.message = 'tested!!!';
    }
  }
})
