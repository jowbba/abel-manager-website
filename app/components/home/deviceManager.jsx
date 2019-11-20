import React from 'react'
import { connect } from 'react-redux'
import { Card, Table} from 'antd'

const columes = [
  { title: 'usn', key: 'usn', dataIndex: 'usn'},
  { title: 'sn', key: 'sn', dataIndex: 'sn' },
  { title: 'sku', key: 'sku', dataIndex: 'sku' },
  { title: 'time', key: 'time', dataIndex: 'time' },
  { title: 'city', key: 'city', dataIndex: 'city' },
  { title: 'area', key: 'area', dataIndex: 'area' }
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
          <Table columns={columes} dataSource={device}/>
        </Card>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    data: state.data
  }
}

module.exports = connect(mapStateToProps)(DeviceList)