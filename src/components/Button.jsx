import React, { memo } from 'react'
import { Text, TouchableOpacity, View, ViewPropTypes } from 'react-native'
import { apx } from '../utils/device'
import { fontFamily } from '../styles'

interface IProps {
  theme?: 'black';
  style?: ViewPropTypes.style;
  textStyle?: ViewPropTypes.style;
  text?: string;
  onPress?: () => any;
  clickable?: boolean;
}

const Button = ({
  style = {},
  textStyle = {},
  text = '',
  onPress = () => {},
  clickable,
}: IProps) => {
  const Touch = clickable ? TouchableOpacity : View

  return (
    <Touch
      style={{
        width: apx(165),
        height: apx(50),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: clickable ? 'rgb(41,30,30)' : 'rgb(115,115,115)',
        ...style,
      }}
      onPress={() => {
        if (!clickable) {
          return
        }
        onPress()
      }}
    >
      <Text
        style={{
          color: '#fff',
          fontSize: apx(28),
          fontFamily: fontFamily.wawa,
          ...textStyle,
        }}
      >
        {text}
      </Text>
    </Touch>
  )
}

export default memo(Button)
