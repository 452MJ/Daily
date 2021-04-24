// In App.js in a new project

import 'react-native-gesture-handler'
import * as React from 'react'
import { Dimensions, Text, TouchableWithoutFeedback } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import GlobalNavigation, { navigationRef } from './utils/GlobalNavigation'
import { apx, isIPhoneX } from './utils/device'
import Col from './components/Col'
import Row from './components/Row'
import Splash from './pages/Splash/Splash'
import Login from './pages/Auth/Login'
import SignUp from './pages/Auth/SignUp'
import DailyList from './pages/Daily/DailyList'
import AddDaily from './pages/Daily/AddDaily'
import DailyDetail from './pages/Daily/DailyDetail'
import BottomNav from './widgets/BottomNav'

global.$navigation = GlobalNavigation

const Tab = createMaterialTopTabNavigator()

function TabScreen() {
  return (
    <Tab.Navigator
      // initialRouteName="Diamond"
      headerMode="none"
      tabBarPosition="bottom"
      tabBar={() => (
        <Col style={{ width: apx(414) }}>
          <BottomNav />
        </Col>
      )}
      // initialLayout={{ width: Dimensions.get('window').width }}
    >
      <Tab.Screen name="Tab" component={DailyStack} />
    </Tab.Navigator>
  )
}

const Root = createStackNavigator()
const Daily = createStackNavigator()

function DailyStack() {
  return (
    <Daily.Navigator
      // initialRouteName={__DEV__ ? 'DailyList' : 'Splash'}
      screenOptions={({ route, navigation }) => ({
        headerShown: false,
        gestureEnabled: true,
        ...TransitionPresets.SlideFromRightIOS,
      })}
      mode="card"
    >
      <Daily.Screen name="DailyList" component={DailyList} />
      <Daily.Screen name="DailyDetail" component={DailyDetail} />
      <Daily.Screen name="AddDaily" component={AddDaily} />
    </Daily.Navigator>
  )
}

function Router() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Root.Navigator
        // initialRouteName={__DEV__ ? 'DailyList' : 'Splash'}
        screenOptions={({ route, navigation }) => ({
          headerShown: false,
          gestureEnabled: true,
          ...TransitionPresets.SlideFromRightIOS,
        })}
        mode="card"
      >
        <Root.Screen name="Splash" component={Splash} />
        <Root.Screen
          name="Login"
          component={Login}
          options={{ ...TransitionPresets.ModalSlideFromBottomIOS }}
        />
        <Root.Screen
          name="SignUp"
          component={SignUp}
          options={{ ...TransitionPresets.ModalSlideFromBottomIOS }}
        />

        <Root.Screen
          name="Daily"
          component={TabScreen}
          options={{ ...TransitionPresets.FadeFromBottomAndroid }}
        />
      </Root.Navigator>
    </NavigationContainer>
  )
}

export default Router
