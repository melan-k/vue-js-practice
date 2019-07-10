const UserCreate = {
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
}

export default UserCreate