import React from 'react'
import { connect } from 'react-redux'
import { Card, Upload, message, Button, Icon } from 'antd'


class Insert extends React.Component {
  constructor() {
    super()
    this.state = {

    }
  }

  render() {
    const props = {
      name: 'file',
      headers: {
        authorization: 'authorization-text',
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    }
    return (
      <div >
        <Card>
          <Upload {...props}>
            <Button>
              <Icon type="upload" /> Click to Upload
            </Button>
          </Upload>
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

module.exports = connect(mapStateToProps)(Insert)