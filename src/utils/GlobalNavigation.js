/* eslint-disable */
// import { NavigationActions, StackActions } from 'react-navigation'

import * as React from 'react'
import { StackActions, CommonActions } from '@react-navigation/native'

export const navigationRef = React.createRef()
let lastTimestamp = new Date().getTime()
const GlobalNavigation = {
  navigate(routeName, params) {
    if (new Date().getTime() - lastTimestamp > 500) {
      lastTimestamp = new Date().getTime()
      navigationRef.current.navigate(routeName, params)
    }
  },

  push(routeName, params) {
    if (new Date().getTime() - lastTimestamp > 500) {
      lastTimestamp = new Date().getTime()
      navigationRef.current?.dispatch(StackActions.push(routeName, params))
    }
  },

  reset(routeName, params) {

    const {name} = navigationRef.current?.getCurrentRoute()
    if (name !== routeName ){
      navigationRef.current?.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: routeName, params }],
        })
      )
    }

  },

  replace(routeName, params) {
    navigationRef.current?.dispatch(StackActions.replace(routeName, params))
  },

  goBack() {
    navigationRef.current.goBack()
  },

  popToTop(){
    navigationRef.current?.dispatch(StackActions.popToTop());
  } ,


  getParam(key = null) {
    const {
      index,
      routes,
    } = navigationRef.current.getRootState().routes[0].state

    if (key) {
      return routes[index].params[key]
    }
    return routes[index].params
  },
}

export default GlobalNavigation
