import React, { memo } from 'react'
import Flex from '@ant-design/react-native/lib/flex'
import { FlexPropsType } from '@ant-design/react-native/lib/flex/PropsType'
import { ViewPropTypes } from 'react-native'

interface IProps extends FlexPropsType {
  style?: ViewPropTypes.style;
}

function Row(props: IProps) {
  const { children, ...other } = props
  return <Flex {...other}>{children}</Flex>
}

export default memo(Row)
