import 'react-native-gesture-handler'
import React, { Component } from 'react'
import { Provider } from '@ant-design/react-native'
import { StatusBar, Text, TextInput } from 'react-native'
import { DURATION, POSITION, show, TYPE } from '@react-native-hero/toast'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import GlobalNavigation from './utils/GlobalNavigation'
import LoadingIndicator from './components/LoadingIndicator'
import styles from './styles'
import colors from './styles/colors'
import services from './services'
import storages from './utils/storages'
import Router from './router'
import http from './utils/httpUtil'
import i18nUtil from './translations/i18n'

global.$toast = {
  show: msg => {
    show({
      text: msg,
      // optional
      // as shown below, these are the default values
      type: TYPE.TEXT,
      duration: DURATION.SHORT,
      position: POSITION.CENTER,
    })
  },
  success: msg => {
    show({
      text: msg,
      // optional
      // as shown below, these are the default values
      type: TYPE.SUCCESS,
      duration: DURATION.SHORT,
      position: POSITION.CENTER,
    })
  },
  error: msg => {
    show({
      text: msg,
      // optional
      // as shown below, these are the default values
      type: TYPE.ERROR,
      duration: DURATION.SHORT,
      position: POSITION.CENTER,
    })
  },
}
global.$styles = styles
global.$colors = colors
global.$services = services
global.$navigation = GlobalNavigation
global.$storage = storages
global.$http = http
global.$i18n = i18nUtil

TextInput.defaultProps = Object.assign({}, TextInput.defaultProps, {
  allowFontScaling: false,
}) // 新版RN使用该方法替代
Text.defaultProps = Object.assign({}, Text.defaultProps, {
  allowFontScaling: false,
})
KeyboardAwareScrollView.defaultProps = Object.assign(
  {},
  KeyboardAwareScrollView.defaultProps,
  {
    showsVerticalScrollIndicator: false,
  }
)

class Entry extends Component {
  render() {
    return (
      <Provider>
        <StatusBar animated translucent />
        <Router />

        <LoadingIndicator
          ref={ref => {
            global.$loading = ref
          }}
        />
      </Provider>
    )
  }
}

export default Entry
