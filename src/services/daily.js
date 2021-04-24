export default {
  async getDailyList({ page }) {
    const list = await $http.get($http.api.daily.getDailyList, {
      page,
      count: 20,
    })
    return list
  },

  async getDailyDetail(id) {
    const res = await $http.get($http.api.daily.getDailyDetail(id))
    return res
  },

  async addDaily({ content }) {
    const res = await $http.post($http.api.daily.addDaily, {
      title: '12341234',
      content,
    })

    return res
  },
}
