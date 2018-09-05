const { RESTDataSource } = require('apollo-datasource-rest')

class UserAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = `http://localhost:${process.env.PORT || 4001}/v1`
  }
  willSendRequest(request) {
    request.headers.set('Authorization', this.context.token)
  }
  async getUser(id) {
    return this.get(`/users${id}`)
  }
  async getUserList(limit = 10) {
    const data = await this.get('/users', {
      per_page: limit,
      order_by: 'most_viewed',
    })
    return data.data
  }
  // an example making an HTTP POST request
  async postUser(user) {
    return this.post(
      '/users', // path
      user, // request body
    )
  }
}

module.exports = UserAPI
