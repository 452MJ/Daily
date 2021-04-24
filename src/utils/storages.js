import AsyncStorage from '@react-native-community/async-storage'

const storage = {
  KEYS: {
    loginInfo: 'loginInfo',
    token: 'token',
  },
  storeData: async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
      // saving error
    }
  },
  getData: async key => {
    try {
      const value = await AsyncStorage.getItem(key)
      if (value !== null) {
        // value previously stored
        return JSON.parse(value)
      }
      return null
    } catch (e) {
      // error reading value
      return null
    }
  },

  removeItem(key) {
    AsyncStorage.removeItem(key)
  },
}

export default storage
