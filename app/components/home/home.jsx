import React from 'react'
import { connect } from 'react-redux'
import { Layout, Menu, Breadcrumb, Icon } from 'antd'
const { Content, Sider } = Layout;
const { SubMenu } = Menu;
import Summary from './summary'
import DeviceList from './deviceList'
import Insert from './insert'
import DeviceManager from './deviceManager'
import css from 'Css/home.css'
import store from '../../store/store'
import action from '../../action/action'

const breadCrumbName = {
  user: '销售管理',
  insert: '增加用户',
  manager: '管理用户',
  query: '数据查询',
  summary: '概览',
  deviceQuery: '设备查询'
}

const mapKeyToContent = key => {
  let obj = {
    summary: <Summary/>,
    deviceQuery: <DeviceList/>,
    manager: <DeviceManager/>,
    insert: <Insert/>
  }

  let component = obj[key]
  if (!component) return null
  else return component
} 

class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      collapsed: false,
      breadCrumb: [],
      key: 'summary'
    };
  
    this.onCollapse = collapsed => {
      this.setState({ collapsed })
    };
  }

  componentDidMount() {
    if (!this.props.data.token) this.props.history.replace('/')
    store.dispatch(action.getDevice())
    store.dispatch(action.getFlow())
    store.dispatch(action.getDeviceOnline())

  }

  render() {
    let { collapsed, breadCrumb, key } = this.state
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse.bind(this)} style={{ minHeight: '100vh' }}>

          <Menu theme="dark" mode="inline" defaultOpenKeys={['query']} defaultSelectedKeys={['summary']} onClick={this.select.bind(this)}>
            <SubMenu key='query' title={
              <span>
                <Icon type="area-chart" />
                <span>数据查询</span>
              </span>}>
              <Menu.Item key='summary'>概览</Menu.Item>
              <Menu.Item key='deviceQuery'>设备查询</Menu.Item>
            </SubMenu>
            
            <SubMenu key='user' title={
              <span>
                <Icon type="user" />
                <span>销售管理</span>
              </span>
            }>
              <Menu.Item key='insert'>增加用户</Menu.Item>
              <Menu.Item key='manager'>管理用户</Menu.Item>

            </SubMenu>
          </Menu>
          
        </Sider>
        <Layout className={css.contentWrapper}>
            <Breadcrumb>
              {breadCrumb.map(item => (
                <Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>
              ))}
            </Breadcrumb>
          <Content className={css.content}>
            {mapKeyToContent(key)}
          </Content>
        </Layout>
      </Layout>
    )
  }

  select(args) {
    let { key, keyPath } = args
    let breadCrumb = []
    keyPath.forEach(key => {
      let name = breadCrumbName[key]
      breadCrumb.unshift(name)
    })

    this.setState({
      breadCrumb,
      key
    })
  }
}

var mapStateToProps = state => {
  return {
    data: state.data
  }
}

export default connect(mapStateToProps)(Home)