import React from 'react'
import { connect } from 'react-redux'
import { Card, Table, DatePicker } from 'antd'
import store from '../../store/store'
import action from '../../action/action'
const { RangePicker } = DatePicker

const parseFlow = item => {
  if (!item) return <a>{(item/1024/1024).toFixed(0) + 'MB'}</a>
  else if (item / 1024 / 1024 > 1024) return <a>{(item/1024/1024/1024).toFixed(2) + 'GB'}</a>
  else return <a>{(item/1024/1024).toFixed(2) + 'MB'}</a>
}

const formatSecond = second => {
  return Math.floor(second / 60 / 60).toFixed(2) + '小时'
}

const columes = [
  { title: 'usn', key: 'usn', dataIndex: 'usn'},
  { title: 'sn', key: 'sn', dataIndex: 'sn'},
  { title: 'sku', key: 'sku', dataIndex: 'sku' },
  { title: '购买时间', key: 'time', dataIndex: 'time', render: text =>text.split('T')[0], sorter: (a, b) => (new Date(a.time)).getTime() - (new Date(b.time)).getTime()},
  { title: '城市', key: 'city', dataIndex: 'city' },
  { title: '区', key: 'area', dataIndex: 'area' },
  { title: '上传流量', key: 'flowUp', dataIndex: 'flowUp', render: parseFlow, sorter: (a, b) => a.flowUp - b.flowUp},
  { title: '下载流量', key: 'flowDown', dataIndex: 'flowDown', render: parseFlow, sorter: (a, b) => a.flowDown - b.flowDown},
  { title: '上线次数', key: 'online', dataIndex: 'online', sorter: (a, b) => a.online - b.online},
  { title: '下线次数', key: 'offline', dataIndex: 'offline', sorter: (a, b) => a.offline - b.offline},
  { title: '版本', key: 'version', dataIndex: 'version'},
  { title: '在线时长', key: 'second', dataIndex: 'second', render: formatSecond, sorter: (a, b) => a.second - b.second}
]

class DeviceList extends React.Component {
  constructor() {
    super()
    this.state = {
      
    }
  }

  render() {
    let { device } = this.props.data
    console.log(device)
    return (
      <div >
        <Card>
          <RangePicker onChange={this.onChange.bind(this)}/>
          <Table columns={columes} dataSource={device}/>
        </Card>
      </div>
    )
  }

  onChange(datas, dataString) {
    store.dispatch(action.getDevice(dataString[0], dataString[1]))
  }
}


const mapStateToProps = state => {
  return {
    data: state.data
  }
}

module.exports = connect(mapStateToProps)(DeviceList)