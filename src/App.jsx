import 'react-native-gesture-handler'
import React from 'react'
import { Provider } from 'react-redux'
import { lockToPortrait } from 'react-native-orientation'
import { create } from 'dva-core'
import Entry from './entry'
// eslint-disable-next-line import/named
import { createApp } from './models/dva'
import models from './models/index'

console.disableYellowBox = true

if (!__DEV__) {
  global.console.log = () => {}
}

lockToPortrait()

const app = create()
models.forEach((model: any) => app.model(model))
app.start()

const store = app._store
global.$store = app._store

const App = () => (
  <Provider store={store}>
    <Entry />
  </Provider>
)

export default App
