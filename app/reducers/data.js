
const defaultState = {
  token: '',
  activeCount: 0,
  device: [],
  deviceOnline: null,
  flow: null,
  flowLimit: null,
  flows: [],
  onlineTimes: [],
  message: '',
}

const data = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_SIZE':
      let minHeight = action.height > 500 ? action.height : 500
      return Object.assign({}, state, {
        width: action.width,
        height: minHeight
      })

    case 'LOGIN':
      return Object.assign({}, state, { token: action.data })

    case 'DEVICE_ONLINE':
      return Object.assign({}, state, { deviceOnline: action.deviceOnline})

    case 'FLOW':
      return Object.assign({}, state, { flow: action.data })

    case 'FLOW_LIMIT':
      return Object.assign({}, state, { flowLimit: action.data})

    case 'DEVICE':
      return Object.assign({}, state, { device: action.device, activeCount: action.count })

    case "FLOWS":
      return Object.assign({}, state, { flows: action.data})
    default:
      return state
  }
}

export default data