export default {
  async login({ email, password }) {
    const res = await $http.post($http.api.user.login, {
      email,
      password,
    })
    return res
  },
  async getUserInfo() {
    const res = await $http.get($http.api.user.getUserInfo)
    return res
  },
  async signUp({ name, email, password }) {
    const res = await $http.post($http.api.user.signUp, {
      name,
      email,
      password,
    })
    return res
  },
}
