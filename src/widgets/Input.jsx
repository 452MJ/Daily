import React, { useState } from 'react'
import { connect } from 'react-redux'

import { Text, TextInput, TextInputProps } from 'react-native'
import type { ViewStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet'
import Col from '../components/Col'
import { apx } from '../utils/device'
import { fontFamily } from '../styles'

interface IProps extends TextInputProps {
  contentContainerStyle?: ViewStyleProp;
  title: string;
}

export default connect(state => state)(Input)
function Input({
  contentContainerStyle,
  title,
  secureTextEntry,
  ...inputStyle
}: IProps) {
  const [focused, setFocused] = useState(false)

  return (
    <Col align="start" style={contentContainerStyle}>
      <Text
        style={{
          fontSize: apx(22),
          color: '#000',
          fontFamily: fontFamily.light,
          marginBottom: apx(14),
        }}
      >
        {title}
      </Text>
      <TextInput
        style={{
          width: apx(302),
          height: apx(46),
          margin: 0,
          padding: 0,
          fontSize: apx(20),
          paddingHorizontal: apx(14),
          color: 'rgb(52,52,52)',
          borderColor: '#000',
          borderWidth: apx(2),
          backgroundColor: focused ? '#fff' : 'rgb(244,244,244)',
          includeFontPadding: false,
          textAlignVertical: 'center',
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        secureTextEntry={secureTextEntry}
        {...inputStyle}
      />
    </Col>
  )
}
