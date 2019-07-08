const Sharable = {
  data: function() {
    return {
      _isProcessing: false
    }
  },
  methods: {
    share: function() {
      if (this._isProcessing) {
        return
      }
      if (!window.confirm('シェアしますか？')) {
        return
      }
      this._isProcessing = true
      setTimeout(() => {
        window.alert('シェアしました')
        this._isProcessing = false
      }, 300)
    }
  }
}

const IconShareButton = {
  mixins: [Sharable],
  template: `
    <button @click="share"><i class="fas fa-share-square"></i></button>
  `
}

const TextShareButton = {
  mixins: [Sharable],
  template: `
    <button @click="share">シェアする</button>
  `,
  methods: {
    share() {
      // どちらのメソッドが呼ばれるか
      window.alert('コンポーネントからシェアしました')
    }
  }
}

new Vue({
  el: '#app',
  components: {
    IconShareButton,
    TextShareButton
  }
}) 