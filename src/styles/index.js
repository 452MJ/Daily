import { Platform, StyleSheet } from 'react-native'
import { apx } from '../utils/device'

export const fontFamily = {
  light: Platform.OS === 'ios' ? 'NotoSansCJKsc-Light' : 'NotoSansCJKsc-Light',
  regular:
    Platform.OS === 'ios' ? 'NotoSansCJKsc-Regular' : 'NotoSansCJKsc-Regular',
  wawa: Platform.OS === 'ios' ? 'Wawati SC' : 'WawatiSC',
}
export default StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupWindow: {
    zIndex: 999,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  shadow: {
    shadowOffset: { width: apx(0), height: apx(2) },
    shadowColor: 'rgb(0, 0, 0)',
    shadowOpacity: 0.5,
    shadowRadius: apx(4),
    elevation: apx(2),
  },
})
