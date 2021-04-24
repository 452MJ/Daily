export default {
  namespace: 'user',
  state: {
    token: null,
  },
  reducers: {
    updateToken(state, { payload }) {
      return {
        ...state,
        token: payload,
      }
    },
  },
  effects: {},
  subscriptions: {},
}
