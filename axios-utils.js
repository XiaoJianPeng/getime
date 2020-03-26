const axios = require('axios');

const instance = axios.create({
  timeout: 10000,
})

// axios.interceptors.request.use(config => {
//   if (config.type == 'formData' || config.method != 'post') {
//     return config
//   }
//   config.data = qs.stringify(config.data)
//   return config
// }, (err) => {
//   return Promise.reject(err);
// })

// get方法
const get = async (url, params, config) => {
  const result = await instance.get(url, {
    params,
    headers: config,
  })
  return result
}


// post方法
const post = async (url, data, config) =>{
  const result = await instance.post(url, data, {
  headers: config
  })
  return result
}


module.exports = {
  get,
  post
}