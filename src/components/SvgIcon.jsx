/* eslint-disable */
import React, { memo } from "react"
import { SvgCss } from "react-native-svg"
import svgs from "../assets/svgs/svgs"
import { ViewPropTypes } from "react-native"

interface IProps {
  icon: string;
  size?: number;
  width?: number;
  height?: number;
  style?: ViewPropTypes.style;
}

const SvgIcon = ({
                   icon,
                   style = {},
                   size = null,
                   width = 0,
                   height = 0

                 }: IProps) => {
  const svgXmlData = svgs[icon]

  if (!svgXmlData) {
    const errMsg = `Miss "${icon}" svg file`
    throw new Error(errMsg)
  }

  return (
      <SvgCss
          width={size ? size : width}
          height={size ? size : height}
          xml={svgXmlData}
          style={style}
      />
  )
}

export default memo(SvgIcon)

