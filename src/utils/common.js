export const ENV = 'beta' // production | test | staging

const fetchTimeout = 30 * 1000
export const timeoutPromise = (fetchPromise, timeout = fetchTimeout) => {
  const abortPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('网络请求超时'))
    }, timeout)
  })

  return Promise.race([fetchPromise, abortPromise])
}

export const allPromise = (promises, defaultValues) =>
  Promise.all(promises.map((p, i) => p.catch(e => defaultValues[i])))

export const checkEmail = email =>
  /^[A-Za-z0-9]+([_\\.][A-Za-z0-9]+)*@([A-Za-z0-9\\-]+\.)+[A-Za-z]{2,6}$/.test(
    email
  )
