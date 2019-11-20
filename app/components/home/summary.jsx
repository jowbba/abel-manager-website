import React from 'react'
import { connect } from 'react-redux'
import { Card, Divider, Statistic, Row, Col, Icon } from 'antd'
import css from 'Css/summary'
import store from '../../store/store'
import action from '../../action/action'


class Summary extends React.Component {
  constructor() {
    super()
    this.state = {

    }
  }

  

  componentDidUpdate() {
  }

  render() {
    let data = this.props.data
    console.log(data)
    let { flow, flowLimit } = data
    return (
      <div className={css.wrapper}>
        <Card className={css.card}>

          <Row className={css.cardTitle}>
            <span>设备统计</span>
            <Icon type="sync" onClick={this.syncDevice.bind(this)}/>
          </Row>
          <Row className={css.statistic}>
            <Col span={8}>
              <Statistic title='已售设备' value={data.device.length} />
            </Col>
            <Col span={8}>
              <Statistic title='已激活设备' value={data.activeCount} />
            </Col>
            <Col span={8}>
              <Statistic title='在线设备数' value={data.deviceOnline} />
            </Col>
          </Row>
        </Card>

        <Card className={css.card}>
          <Row className={css.cardTitle}>
            <span>前20%设备流量分析</span>
            <Icon type="sync" onClick={this.syncFlow.bind(this)}/>
          </Row>
          <Row>
            <Col span={12}>
              <Statistic title='前20%设备上传流量' value={flowLimit && flowLimit.flowUp.toFixed(2) + 'GB'} />
            </Col>
            <Col span={12}>
              <Statistic title='前20%设备上传流量占比' 
              value={flowLimit && flow && (flowLimit.flowUp/flow.all.up).toFixed(2)*100 + '%'} />
            </Col>

            <Col span={12}>
              <Statistic title='前20%设备下载流量' value={flowLimit && flowLimit.flowDown.toFixed(2) + 'GB'} />
            </Col>
            <Col span={12}>
              <Statistic title='前20%设备下载流量占比' 
              value={flowLimit && flow && (flowLimit.flowDown/flow.all.down).toFixed(2)*100 + '%'} />
            </Col>
          </Row>
        </Card>

        <Card className={css.card}>
          <Row className={css.cardTitle}>
            <span>流量统计</span>
            <Icon type="sync" onClick={this.syncFlow.bind(this)}/>
          </Row>
          <Row className={css.statistic}>
              <Col span={8}>
                <Statistic title='今日使用流量' value={flow && flow.today.total.toFixed(2) + 'GB'} />
              </Col>

              <Col span={8}>
                <Statistic title='今日上行流量' value={flow && flow.today.up.toFixed(2) + 'GB'} />
              </Col>

              <Col span={8}>
                <Statistic title='今日下行流量' value={flow && flow.today.down.toFixed(2) + 'GB'} />
              </Col>

              <Col span={8}>
              <Statistic title='昨日使用流量' value={flow && flow.yesterday.total.toFixed(2) + 'GB'} />
              </Col>

              <Col span={8}>
              <Statistic title='昨日上行流量' value={flow && flow.yesterday.up.toFixed(2) + 'GB'} />
              </Col>

              <Col span={8}>
              <Statistic title='昨日下行流量' value={flow && flow.yesterday.down.toFixed(2) + 'GB'} />
              </Col>

              <Col span={8}>
              <Statistic title='本月使用流量' value={flow && flow.currentMonth.total.toFixed(2) + 'GB'} />
            </Col>

            <Col span={8}>
              <Statistic title='本月上行流量' value={flow && flow.currentMonth.up.toFixed(2) + 'GB'} />
            </Col>

            <Col span={8}>
              <Statistic title='本月下行流量' value={flow && flow.currentMonth.down.toFixed(2) + 'GB'} />
            </Col>

            <Col span={8}>
              <Statistic title='上月使用流量' value={flow && flow.lastMonth.total.toFixed(2) + 'GB'} />
            </Col>

            <Col span={8}>
            <Statistic title='上月上行流量' value={flow && flow.lastMonth.up.toFixed(2) + 'GB'} />
            </Col>

            <Col span={8}>
            <Statistic title='上月下行流量' value={flow && flow.lastMonth.down.toFixed(2) + 'GB'} />
            </Col>
          </Row>

        </Card>
      </div>
    )
  }

  syncDevice() {
    // store.dispatch(action.getDevice())
    store.dispatch(action.getDeviceOnline())
  }

  syncFlow() {
    store.dispatch(action.getFlow())
  }
}


const mapStateToProps = state => {
  return {
    data: state.data
  }
}

module.exports = connect(mapStateToProps)(Summary)