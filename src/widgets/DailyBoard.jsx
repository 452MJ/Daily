import React, { useCallback, useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
} from 'react-native'
import FastImage from 'react-native-fast-image'
import type { ViewStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet'
import { apx, isIPhoneX, statusBarHeight } from '../utils/device'
import { fontFamily } from '../styles'
import Col from '../components/Col'
import Container from '../components/Container'
import BottomNav from './BottomNav'

interface IProps {
  style?: ViewStyleProp;
  textProps?: any;
  content: string;
}

export default connect(state => state)(DailyBoard)
function DailyBoard({ style, textProps, content }: IProps) {
  return (
    <Col
      style={{
        backgroundColor: '#fff',
        borderRadius: apx(2),
        padding: apx(12),
        borderColor: 'rgb(151,151,151)',
        borderWidth: apx(1),
        ...$styles.shadow,
        ...style,
      }}
      justify="start"
      align="start"
    >
      <Text
        numberOfLines={4}
        {...textProps}
        style={{
          margin: 0,
          padding: 0,
          fontSize: apx(22),
          color: '#000',
          fontFamily: fontFamily.light,
          textAlignVertical: 'top',
          includeFontPadding: false,
          ...(textProps?.style ? textProps?.style : {}),
        }}
      >
        {content}
      </Text>
    </Col>
  )
}
