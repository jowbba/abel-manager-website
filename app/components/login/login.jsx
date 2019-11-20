import React from 'react'
import { connect } from 'react-redux'
import action from '../../action/action'
import store from '../../store/store'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import css from 'Css/login.css'

class Login extends React.Component {
  constructor() {
    super()
    this.handleSubmit = e => {
      e.preventDefault()
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          let { username, password } = values
          store.dispatch(action.login(username, password))
          // 
        }
      })
    }
  }

  componentDidUpdate(pre, next) {
    if (this.props.data.token) {
      this.props.history.push('/home')
    }
  }

  render() {
    let style={ minHeight: '100vh', minWidth: '100vw', backgroundImage: `url(${require('Image/login_bg.jpg')})`}
    const { getFieldDecorator } = this.props.form
    return (
      <div style={style} className={css.wrapper}>
        <Form onSubmit={this.handleSubmit} className={css['login-form']}>
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />,
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className={css['login-form-button']}>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

var mapStateToProps = state => {
  return {
    data: state.data
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);

module.exports = connect(mapStateToProps)(WrappedNormalLoginForm)