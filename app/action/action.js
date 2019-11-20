import request from 'superagent'

const baseUrl = 'http://52.80.138.130:3001/c/v1'
// const baseUrl = 'http://localhost:3001/c/v1'

const get = (url, getState, qs) => {
  return request.get(baseUrl + url).query(qs).set('Authorization', getState().data.token)
}

const post = (url, body, getState) => {
  return request.post(baseUrl + url).send(body)
}

export default {
  // 取token --> data.token
  login(username, password) {
    return (dispatch) => {
      post('/token', { username, password }).then(res => {
        if (res.statusCode == 200) dispatch({ type: 'LOGIN', data: res.body.data.token })
      }, (err) => {
        console.log(err)
      })
    }
  },

  // 总在线设备数 --> data.deviceOnline
  getDeviceOnline() {
    return (dispatch, getState) => {
      get('/device/online', getState).then(res => {
        dispatch({ type: 'DEVICE_ONLINE', deviceOnline: res.body.data.count })
      }), err => { console.log('err1'), err }
    }
  },

  // 总流量 --> data.flow
  getFlow() {
    return (dispatch, getState) => {
      get('/flow', getState)
        .then(res => {
          dispatch({ type: 'FLOW', data: res.body.data })
        })
    }
  },


  // 每台设备信息 --> associte device flow --> 
  getDevice(begin, end) {
    return (dispatch, getState) => {
      // 设备总数 --> data.device
      get('/device', getState).then(res1 => {

        let device = res1.body.data.map((item, index) => {
          item.key = index
          return item
        })

        // // 前20%设备总流量
        let count = Math.floor(0.2 * device.length)
        get(`/flow?limit=${count}`, getState).then(res2 => {
          let data = res2.body.data
          dispatch({ type: 'FLOW_LIMIT', data })
        })

        // 每台设备流量 --> device --> data.device
        get('/device/flow', getState, { begin, end })
          .then(res3 => {
            device.forEach(deviceItem => {
              let item = res3.body.data.find(record => record.sn == deviceItem.sn)
              if (item) Object.assign(deviceItem, item)
              else Object.assign(deviceItem, { flowUp: 0, flowDown: 0 })
            })

            // 每台设备上下线次数 --> device --> data.device
            get('/device/onlineTimes', getState, { begin, end }).then(res4 => {
              device.forEach(deviceItem => {
                let online = res4.body.data.online.find(record => record.sn == deviceItem.sn)
                let offline = res4.body.data.offline.find(record => record.sn == deviceItem.sn)
                if (online) Object.assign(deviceItem, online)
                else Object.assign(deviceItem, { online: 0 })
                if (offline) Object.assign(deviceItem, offline)
                else Object.assign(deviceItem, { offline: 0 })
              })

              // 在线时长统计
              get('/device/onlineTime', getState, { begin, end }).then(res5 => {
                device.forEach(deviceItem => {
                  let second = res5.body.data.find(second => second.sn == deviceItem.sn)
                  if (second) Object.assign(deviceItem, second)
                  else Object.assign(deviceItem, { second: 0})
                })
                // 每台设备的信息(version)
                get('/deviceInfo', getState).then(res6 => {
                  device.forEach(deviceItem => {
                    let item = res6.body.data.find(info => info.sn == deviceItem.sn)
                    if (item) Object.assign(deviceItem, item)
                  })

                  // 激活设备数
                  get('/device/active', getState).then(res7 => {
                    let result = res7.body.data
                    let count = 0
                    device.forEach(deviceItem => {
                      let item = result.find(station => station.sn == deviceItem.sn)
                      if (item) count++
                    })



                    dispatch({ type: 'DEVICE', device, count })
                  })
                })
              })
            })
          })

      }, err => {
        console.log('err2', err)
      })
    }
  },
}