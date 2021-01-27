module.exports = {
  Query: {
    user (root, { id }, ctx) {
      // return ctx.connector.user.fetchById(id);
      console.log(id)
      return Promise.resolve({ id: 1, name: '111' })
    }
  }
}
