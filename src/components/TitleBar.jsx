import React, { memo } from 'react'

import { Text, TouchableOpacity, View } from 'react-native'
import { Flex } from '@ant-design/react-native'
import FastImage from 'react-native-fast-image'
import { apx, statusBarHeight } from '../utils/device'

import { fontFamily } from '../styles'

interface IProps {
  title: string;
  renderLeft?: React.ReactNode;
  renderRight?: React.ReactNode;
}

const TitleBar = ({
  title,
  renderLeft = (
    <TouchableOpacity
      style={{
        width: apx(87),
        height: apx(87),
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={() => {
        $navigation.goBack()
      }}
    >
      <FastImage
        source={require('../assets/images/backcircle.png')}
        style={{ width: apx(32), height: apx(32) }}
      />
    </TouchableOpacity>
  ),
  renderRight = null,
}: IProps) => (
  <View
    style={{
      width: '100%',
      backgroundColor: '#fff',
      paddingTop: statusBarHeight,
    }}
  >
    <Flex style={{ height: apx(88) }} justify="center">
      <View
        style={{
          position: 'absolute',
          left: 0,
        }}
      >
        {renderLeft}
      </View>

      <Text
        style={{
          fontSize: apx(24),

          color: '#000',
          fontFamily: fontFamily.wawa,
          textAlign: 'center',
        }}
        numberOfLines={1}
      >
        {title}
      </Text>
      <View
        style={{
          position: 'absolute',
          right: 0,
        }}
      >
        {renderRight}
      </View>
    </Flex>
  </View>
)

export default memo(TitleBar)
