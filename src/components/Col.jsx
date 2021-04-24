import React, { memo } from 'react'
import Flex from '@ant-design/react-native/lib/flex'
import { FlexPropsType } from '@ant-design/react-native/lib/flex/PropsType'
import { ViewPropTypes } from 'react-native'

interface IProps extends FlexPropsType {
  style?: ViewPropTypes.style;
}

function Col(props: IProps) {
  const { children, ...other } = props
  return (
    <Flex direction="column" {...other}>
      {children}
    </Flex>
  )
}
export default memo(Col)
