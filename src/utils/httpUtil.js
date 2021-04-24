import { ENV, timeoutPromise } from './common'

let host
// export const defaultUrl = 'ws://192.168.12.135:9944'

if (ENV === 'production') {
  host = 'https://liminjie-875b9d.postdemo.tcn.asia'
} else if (ENV === 'beta') {
  host = 'https://liminjie-875b9d.postdemo.tcn.asia'
}

const api = {
  user: {
    login: '/api/v2/auth/login',
    signUp: '/api/v2/auth/register',
    getUserInfo: '/api/v2/users/me',
  },
  daily: {
    getDailyList: '/api/v2/users/me/posts',
    getDailyDetail: id => `/api/v2/posts/${id}`,
    addDaily: '/api/v2/posts',
  },
}

function customFetch(url, opt, needUpload) {
  return timeoutPromise(
    fetch(url, opt).then(async res => {
      const resJson = await res.json()
      if (res.status === 401) {
        $toast.error(resJson.error)
        $storage.removeItem($storage.KEYS.token)
        $store.dispatch({ type: 'user/updateToken', payload: null })
        $navigation.reset('Login')
        return { code: res.status, ...resJson }
      }

      return { code: res.status, data: resJson }
    }),
    needUpload ? 60 * 1000 : 30 * 1000
  ).catch(err => {
    $loading.hide()
    throw err
    // $toast.error(err.message)
  })
}

const http = {
  api,
  get: (url, params = {}) => {
    let finalUrl = host + url

    Object.keys(params).forEach((key, index) => {
      finalUrl += `${index === 0 ? '?' : '&'}${key}=${encodeURIComponent(
        params[key]
      )}`
    })

    const token = $store.getState().user.token
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(token ? { authsessiontoken: token } : {}),
    }

    return customFetch(
      finalUrl,
      {
        headers,
      },
      false
    ).then(result => {
      if (__DEV__) {
        console.log({ url, params, result })
      }
      return result
    })
  },

  post: (url, params = {}) => {
    const opt = {}
    opt.method = 'post'
    const token = $store.getState().user.token
    opt.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(token ? { authsessiontoken: token } : {}),
    }

    opt.body = JSON.stringify(params)
    return customFetch(host + url, opt).then(result => {
      if (__DEV__) {
        console.log({ url, params, result })
      }
      return result
    })
  },
}

export default http
