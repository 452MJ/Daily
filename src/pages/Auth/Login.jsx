import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import FastImage from 'react-native-fast-image'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { apx, isIPhoneX, statusBarHeight } from '../../utils/device'
import { fontFamily } from '../../styles'
import Col from '../../components/Col'
import Container from '../../components/Container'
import Input from '../../widgets/Input'
import Button from '../../components/Button'

export default connect(state => state)(Login)

function Login() {
  const [params, setParams] = useState({
    email: '',
    password: '',
  })

  useEffect(() => {
    $storage.getData($storage.KEYS.loginInfo).then(loginInfo => {
      if (loginInfo) {
        setParams(loginInfo)
      }
    })
  }, [])

  const [loading, setLoading] = useState(false)

  const [errMsg, setErrMsg] = useState('')

  const onLogin = async () => {
    if (!params.email) {
      setErrMsg('邮箱不能为空')
    }
    if (!params.password) {
      setErrMsg('密码不能为空')
    }
    setLoading(true)
    const { code, error, data } = await $services.user.login(params)

    if (code === 200) {
      $store.dispatch({ type: 'user/updateToken', payload: data.token })

      const res = await $services.user.getUserInfo()
      setLoading(false)

      $storage.storeData($storage.KEYS.loginInfo, {
        email: params.email,
        password: params.password,
      })
      $storage.storeData($storage.KEYS.token, data.token)
      $store.dispatch({ type: 'user/updateToken', payload: data.token })
      $toast.success('登录成功')
      $navigation.reset('Daily')
    } else {
      setLoading(false)
      setErrMsg(error)
    }
  }

  return (
    <Container>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <Col
          style={{
            paddingTop: statusBarHeight,
          }}
          align="center"
        >
          <FastImage
            source={require('../../assets/images/girl.png')}
            style={{ width: apx(128), height: apx(128), marginTop: apx(73) }}
          />
          <Text
            style={{
              width: apx(302),
              minHeight: apx(30),
              fontSize: apx(22),
              color: 'rgb(198,17,17)',
              fontFamily: fontFamily.light,
              marginTop: apx(36),
              textAlign: 'center',
            }}
          >
            {errMsg}
          </Text>

          <Input
            contentContainerStyle={{ marginTop: apx(36) }}
            title="邮件地址"
            editable={!loading}
            value={params.email}
            onChangeText={text => {
              setErrMsg('')
              setParams({ ...params, email: text })
            }}
          />
          <Input
            contentContainerStyle={{ marginTop: apx(58) }}
            title="密码"
            editable={!loading}
            secureTextEntry
            value={params.password}
            onChangeText={text => {
              setErrMsg('')
              setParams({ ...params, password: text })
            }}
          />
          <Button
            text={loading ? '加载中...' : '登录'}
            onPress={onLogin}
            style={{ marginTop: apx(53) }}
            clickable={!loading}
          />
          <Button
            text="没有帐号？注册"
            onPress={() => {
              $navigation.replace('SignUp')
            }}
            style={{
              marginTop: apx(36),
              marginBottom: apx(163),
              width: '100%',
              backgroundColor: 'transparent',
            }}
            textStyle={{
              color: loading ? 'rgb(193,199,204)' : 'rgb(33,137,233)',
              fontSize: apx(15),
              fontFamily: fontFamily.regular,
              textDecorationLine: 'underline',
            }}
            clickable={!loading}
          />
        </Col>
      </KeyboardAwareScrollView>
    </Container>
  )
}
