import i18n from 'i18n-js'
import { I18nManager } from 'react-native'
// import * as RNLocalize from 'react-native-localize'
import cn from './i18n/zh-CN'
import tw from './i18n/zh-TW'
import us from './i18n/en-US'

/**
 *  {isRTL: false, languageTag: "zh-CN", countryCode: "CN", languageCode: "zh"}
 {isRTL: false, languageTag: "zh-TW", countryCode: "TW", languageCode: "zh"}
 {isRTL: false, languageTag: "en-US", countryCode: "US", languageCode: "en"}
 */
const setI18nConfig = locale => {
  const { isRTL, languageTag } = locale

  i18n.translations = {
    'zh-CN': cn,
    'zh-TW': tw,
    'en-US': us,
    zh: tw,
    en: us,
  }
  i18n.locale = languageTag

  // clear translation cache
  // update layout direction
  I18nManager.forceRTL(isRTL)
}

const translation = (zh_cn, zh_tw, en_us) =>
  ({
    'zh-CN': zh_cn,
    'zh-TW': zh_tw,
    'en-US': en_us,
  }[i18n.locale])

const i18nUtil = {
  setI18nConfig,
  translation,
  ...i18n,
}
export default i18nUtil
