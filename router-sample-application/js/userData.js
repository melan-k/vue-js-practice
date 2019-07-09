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