import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { apx, isIPhoneX } from '../utils/device'

function Container(props) {
  return (
    <LinearGradient
      colors={
        props.style && props.style.backgroundColor
          ? [props.style.backgroundColor, props.style.backgroundColor]
          : ['#fff', '#fff']
      }
      useAngle
      angle={36}
      angleCenter={{ x: 0.5, y: 0.5 }}
      style={{
        width: '100%',
        flex: 1,
        paddingBottom: isIPhoneX() ? apx(30) : 0,
        backgroundColor: '#000',
        alignItems: 'center',
        ...props.style,
      }}
    >
      {props.children}
    </LinearGradient>
  )
}

export default Container
