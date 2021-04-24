/* eslint-disable no-unused-expressions */
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import {
  DeviceEventEmitter,
  FlatList,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native'
import FastImage from 'react-native-fast-image'
import moment from 'moment'
import { apx, apxInt, isIPhoneX, statusBarHeight } from '../../utils/device'
import { fontFamily } from '../../styles'
import Col from '../../components/Col'
import Container from '../../components/Container'
import BottomNav from '../../widgets/BottomNav'
import TitleBar from '../../components/TitleBar'
import Button from '../../components/Button'

export default connect(state => state)(AddDaily)
function AddDaily() {
  const [loading, setLoading] = useState(false)
  const refInput = useRef(null)

  const [params, setParams] = useState({ content: '' })

  const onPost = async () => {
    if (!params.content) {
      $toast.error('内容不能为空')
      return
    }
    setLoading(true)
    const { code, error, data } = await $services.daily.addDaily(params)
    setLoading(false)
    if (code === 200) {
      $toast.success('日记添加成功')
      DeviceEventEmitter.emit('refresh')

      $navigation.popToTop()
    } else {
      setLoading(false)
      $toast.error(error)
    }
  }

  return (
    <Col style={{ flex: 1, backgroundColor: 'rgb(233,233,233)' }}>
      <TitleBar title="新日记条目" />
      <Col
        style={{
          flex: 1,
          width: apx(390),
          backgroundColor: '#fff',
          borderRadius: apx(2),
          paddingTop: apx(12),
          paddingBottom: apx(39),
          paddingHorizontal: apx(20),
          marginTop: apx(24),
          borderColor: 'rgb(151,151,151)',
          borderWidth: apx(1),

          ...$styles.shadow,
        }}
      >
        <TextInput
          ref={refInput}
          style={{
            width: apx(350),
            margin: 0,
            padding: 0,
            fontSize: apx(22),
            lineHeight: apxInt(26),
            paddingHorizontal: apx(14),
            color: 'rgb(39,39,39)',
            includeFontPadding: false,
            textAlignVertical: 'center',
            fontFamily: fontFamily.regular,
          }}
          underlineColorAndroid="transparent"
          value={params.content}
          onChangeText={value => {
            setParams({ ...params, content: value })
          }}
          multiline
          editable={!loading}
          placeholder="今天怎么样呢？你过得好吗？"
          placeholderTextColor="rgb(180,180,180)"
        />

        <TouchableWithoutFeedback
          onPress={() => {
            if (loading) {
              return
            }
            if (refInput.current?.isFocused()) {
              refInput.current?.blur()
              return
            }
            refInput.current?.focus()
          }}
        >
          <Col style={{ alignSelf: 'stretch', flex: 1 }} />
        </TouchableWithoutFeedback>
      </Col>
      <Button
        text={loading ? '加载中...' : '提交'}
        onPress={onPost}
        style={{ width: apx(390), height: apx(50), marginVertical: apx(24) }}
        clickable={!loading}
      />
    </Col>
  )
}
