import React, { useState } from 'react'
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
import regexUtil from '../../utils/regexUtil'

export default connect(state => state)(SignUp)

function SignUp() {
  const [params, setParams] = useState({
    name: '',
    email: '',
    password: '',
  })

  const [loading, setLoading] = useState(false)

  const [errMsg, setErrMsg] = useState('')

  const onSignUp = async () => {
    if (!regexUtil.check(params.name, regexUtil.pattern.nickname)) {
      setErrMsg('名称格式不正确')
      return
    }
    if (!regexUtil.check(params.email, regexUtil.pattern.email)) {
      setErrMsg('邮箱格式不正确')
      return
    }
    if (!regexUtil.check(params.password, regexUtil.pattern.password)) {
      setErrMsg('密码格式不正确')
      return
    }

    setLoading(true)
    const { code, error, data } = await $services.user.signUp(params)
    setLoading(false)
    if (code === 200) {
      $storage.storeData($storage.KEYS.loginInfo, {
        email: params.email,
        password: params.password,
      })
      $toast.success('注册成功，已为您自动登录')
      $store.dispatch({ type: 'user/updateToken', payload: data.token })
      $navigation.reset('Daily')
    } else {
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
            title="名字"
            editable={!loading}
            value={params.name}
            onChangeText={text => {
              setErrMsg('')
              setParams({ ...params, name: text })
            }}
            maxLength={48}
          />
          <Input
            contentContainerStyle={{ marginTop: apx(36) }}
            title="邮件地址"
            editable={!loading}
            value={params.email}
            onChangeText={text => {
              setErrMsg('')
              setParams({ ...params, email: text })
            }}
            keyboardType="email-address"
          />
          <Input
            contentContainerStyle={{ marginTop: apx(36) }}
            title="密码"
            secureTextEntry
            editable={!loading}
            value={params.password}
            maxLength={48}
            onChangeText={text => {
              setErrMsg('')
              setParams({ ...params, password: text })
            }}
          />
          <Button
            text={loading ? '加载中...' : '注册'}
            onPress={onSignUp}
            style={{ marginTop: apx(53) }}
            clickable={!loading}
          />
          <Button
            text="已有帐号？登录"
            onPress={() => {
              $navigation.replace('Login')
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
