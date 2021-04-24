import { createLogger } from 'redux-logger';
import { create } from 'dva-core';
// @ts-ignore
let app

let store

let dispatch

let registered: boolean

function createApp(opt: any) {
  // redux 的日志
  opt.onAction = [createLogger()]
  app = create(opt)
  app.use({
    onError(err: any) {
      console.log('dvaError', err)
    },
  })
  if (!registered) {
    opt.models.forEach((model: any) => app.model(model))
  }
  registered = true
  app.start()
  store = app._store
  app.getStore = () => store
  dispatch = store.dispatch
  app.dispatch = dispatch
  if (global) {
    global.dva_app = app
  }
  return app
}

export default {
  createApp,
  getDispatch() {
    return app.dispatch
  },
}
