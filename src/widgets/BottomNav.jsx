import React from 'react'
import { connect } from 'react-redux'

import { DeviceEventEmitter, TouchableOpacity } from 'react-native'
import FastImage from 'react-native-fast-image'
import Col from '../components/Col'
import { apx, isIPhoneX } from '../utils/device'
import Row from '../components/Row'
import { navigationRef } from '../utils/GlobalNavigation'

export default connect(state => state)(BottomNav)
function BottomNav() {
  const btns = [
    {
      icon: require('../assets/images/pencil.png'),
      onPress: () => {
        $navigation.navigate('AddDaily')
      },
    },
    {
      icon: require('../assets/images/diary.png'),
      onPress: () => {
        $navigation.popToTop()
      },
    },
    {
      icon: require('../assets/images/logout.png'),
      onPress: () => {
        $storage.removeItem($storage.KEYS.token)
        $store.dispatch({ type: 'user/updateToken', payload: null })
        $navigation.reset('Login')
      },
    },
  ]
  return (
    <Col
      style={{
        backgroundColor: 'rgb(248,248,248)',
        paddingBottom: isIPhoneX() ? apx(30) : 0,
      }}
    >
      <Row
        style={{
          width: '100%',
          borderColor: 'rgb(210,210,210)',
          borderTopWidth: apx(1),
          borderBottomWidth: isIPhoneX() ? apx(1) : 0,
        }}
      >
        {btns.map(({ icon, onPress }, index) => (
          <TouchableOpacity
            key={index.toString()}
            onPress={onPress}
            style={{
              flex: 1,
              borderColor: 'rgb(210,210,210)',
              borderLeftWidth: index === 1 ? apx(1) : 0,
              borderRightWidth: index === 1 ? apx(1) : 0,
            }}
          >
            <Col
              style={{
                height: apx(80),
              }}
              justify="center"
              align="center"
            >
              <FastImage
                source={icon}
                style={{
                  width: apx(48),
                  height: apx(48),
                }}
              />
            </Col>
          </TouchableOpacity>
        ))}
      </Row>
    </Col>
  )
}
