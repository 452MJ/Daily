import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { SafeAreaView, StatusBar, Text, TouchableOpacity } from 'react-native'
import FastImage from 'react-native-fast-image'
import { apx, isIPhoneX } from '../../utils/device'
import { fontFamily } from '../../styles'
import Col from '../../components/Col'

export default connect(state => state)(Splash)
function Splash() {
  useEffect(() => {
    setTimeout(async () => {
      const token = await $storage.getData($storage.KEYS.token)
      if (token) {
        $store.dispatch({ type: 'user/updateToken', payload: token })
        $navigation.replace('Daily')
      } else {
        $navigation.replace('Login')
      }
    }, 1500)
  }, [])

  return (
    <Col
      style={{ flex: 1, backgroundColor: 'rgb(100,2,99)' }}
      justify="between"
    >
      <FastImage
        source={require('../../assets/images/diary.png')}
        style={{ width: apx(256), height: apx(256), marginTop: apx(256) }}
      />
      <Text
        style={{
          fontSize: apx(22),
          color: '#fff',
          fontFamily: fontFamily.light,
          marginBottom: apx(32 + isIPhoneX() ? 30 : 0),
        }}
      >
        我的日记 V1.0.0
      </Text>
    </Col>
  )
}
