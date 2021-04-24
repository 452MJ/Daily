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
import moment from 'moment'
import { apx, isIPhoneX, statusBarHeight } from '../../utils/device'
import { fontFamily } from '../../styles'
import Col from '../../components/Col'
import Container from '../../components/Container'
import BottomNav from '../../widgets/BottomNav'
import TitleBar from '../../components/TitleBar'
import DailyBoard from '../../widgets/DailyBoard'

export default connect(state => state)(DailyDetail)
function DailyDetail({
  route: {
    params: { id },
  },
}) {
  const [daily, setDaily] = useState(null)

  const requestDetail = async () => {
    // $loading.show()
    const { data } = await $services.daily.getDailyDetail(id)
    // $loading.hide()
    setDaily(data)
  }

  useEffect(() => {
    requestDetail()
  }, [])

  return (
    <Col style={{ flex: 1, backgroundColor: 'rgb(233,233,233)' }}>
      <TitleBar
        title={
          daily ? moment(daily.create_at).format('yyyy年MM月DD日') : '加载中...'
        }
      />
      <Col style={{ flex: 1 }}>
        {daily && (
          <DailyBoard
            content={daily?.content}
            style={{
              width: apx(390),
              marginTop: apx(24),
              paddingTop: apx(12),
              padding: apx(20),
            }}
            textProps={{
              numberOfLines: 0,
              style: {
                width: apx(350),
              },
            }}
          />
        )}
      </Col>
    </Col>
  )
}
