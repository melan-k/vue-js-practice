var vm = new Vue({
  el: '#app',
  data: function() {
    return {
      count: 0,
      timerId: null
    }
  },
  created: function() {
    console.log('created')
    var that = this
    // データに参照できる
    console.log(this.count)
    // DOM要素が紐付いていないので undefined
    console.log(this.$el)
    // タイマー処理を開始する
    this.timerId = setInterval(function () {
      that.count += 1
    }, 1000)
  },
  mounted: function() {
    console.log('mounted')
    // DOM要素が紐付いている
    console.log(this.$el)
  },
  beforeDestroy: function() {
    console.log('beforeDestroy')
    // タイマーの後始末を行う
    clearInterval(this.timerId)
  }
})
window.vm = vm