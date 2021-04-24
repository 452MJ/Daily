import React from 'react'
import {
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  ViewPropTypes,
} from 'react-native'
import Col from './Col'

// export default Platform.OS === 'ios'
//   ? TouchableOpacity
//   : TouchableNativeFeedback

interface IProps {
  style?: ViewPropTypes.style;
  onPress?: void;
}

function Touchable({ children, style, ...other }: IProps) {
  const Component =
    Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback

  return (
    <Col style={style}>
      <Component {...other}>
        <Col>{children}</Col>
      </Component>
    </Col>
  )
}

export default Touchable
