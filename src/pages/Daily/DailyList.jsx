import React, { useCallback, useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { DeviceEventEmitter, FlatList, TouchableOpacity } from 'react-native'
import { apx, statusBarHeight } from '../../utils/device'
import Col from '../../components/Col'
import BottomNav from '../../widgets/BottomNav'
import DailyBoard from '../../widgets/DailyBoard'

export default connect(state => state)(DailyList)
function DailyList() {
  const [params, setParams] = useState({
    refreshing: false,
    page: 1,
    loadEnd: false,
    loadFinish: false,
  })
  const [list, setList] = useState([])
  const paramsRef = useRef(params)
  const listRef = useRef(list)

  const requestList = async (refresh = false) => {
    const { data } = await $services.daily.getDailyList(paramsRef.current)

    const newList = refresh ? data : listRef.current.concat(data)

    listRef.current = newList
    setList(listRef.current)

    paramsRef.current = {
      refreshing: false,
      page: paramsRef.current.page + 1,
      loadEnd: data.length < 20,
      loadFinish: true,
    }
    setParams(paramsRef.current)
  }

  const onLoadMore = useCallback(() => {
    if (paramsRef.current.loadEnd || !paramsRef.current.loadFinish) {
      return
    }

    requestList()
  }, [])

  const onRefresh = useCallback(() => {
    paramsRef.current = {
      refreshing: true,
      page: 1,
      loadEnd: false,
      loadFinish: false,
    }
    setParams(paramsRef.current)

    requestList(true)
  }, [])

  useEffect(() => {
    onRefresh()
    DeviceEventEmitter.addListener('refresh', () => onRefresh())
    return () => {
      DeviceEventEmitter.removeAllListeners('refresh')
    }
  }, [])


  return (
    <Col style={{ flex: 1, backgroundColor: 'rgb(233,233,233)' }}>
      <FlatList
        style={{ flex: 1, width: '100%' }}
        contentContainerStyle={{ paddingVertical: statusBarHeight }}
        data={list}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          width: apx(414),
          paddingHorizontal: apx(24),
          alignItems: 'center',
        }}
        onEndReached={onLoadMore}
        onEndReachedThreshold={0}
        onRefresh={onRefresh}
        keyExtractor={(_, index) => index.toString()}
        refreshing={params.refreshing}
        renderItem={({ item: { content, id } }) => (
          <TouchableOpacity
            onPress={() =>
              $navigation.navigate('DailyDetail', {
                id,
              })
            }
            style={{ marginTop: apx(24) }}
          >
            <DailyBoard
              style={{ width: apx(171), height: apx(159) }}
              content={content}
            />
          </TouchableOpacity>
        )}
      />
    </Col>
  )
}
