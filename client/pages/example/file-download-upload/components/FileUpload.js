import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva/index';
import { Map } from 'immutable';
import callApi from '../../../../utils/fetch';

@connect()
class FileUpload extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      files: Map(),
      textInputs: Map({
        fileTitle: '',
      }),
    };
    this.uploadFiles = []; // 选择的上传文件
  }

  // 文件变化后
  handleChangeFile = uploadFile => e => {
    const target = e.target;
    const file = target.files[0];
    this.uploadFiles.push([uploadFile, file]);
    const [fileName, fileType] = file.name.split('.');
    let { files } = this.state;
    files = files.set(
      uploadFile,
      Map({
        fileName,
        fileType: `.${fileType}`,
      })
    );

    this.setState({
      files,
    });
  };

  handleChangeInput = field => e => {
    let { textInputs } = this.state;
    textInputs = textInputs.set(field, e.target.value);

    this.setState({
      textInputs,
    });
  };

  // 上传
  handleUploadFile = () => {
    if (this.uploadFiles.length === 0) {
      this.props.dispatch({
        type: 'toast/show',
        payload: { content: '请先上传测试数据' },
      });
      return;
    }

    // 对于低版本浏览器，比如 ie9-，包括 ie9，待处理
    const formData = new FormData();
    this.uploadFiles.forEach(item => {
      formData.append([item[0]], item[1]);
    });
    const entries = this.state.textInputs.entries();
    let entry = entries.next();
    while (!entry.done) {
      formData.append(entry.value[0], entry.value[1]);
      entry = entries.next();
    }

    callApi({
      prefix: 'api-ext',
      url: 'common/file-upload',
      body: formData,
    }).then(
      () => {
        this.props.dispatch({
          type: 'toast/show',
          payload: { content: '上传成功' },
        });
      },
      () => {
        this.props.dispatch({
          type: 'toast/show',
          payload: { content: '上传失败' },
        });
      }
    );
  };

  render() {
    const { files } = this.state;

    return (
      <div className="container m-t-4">
        <h4>文件下载</h4>
        <div>
          <a
            className="btn btn-primary btn-raised"
            href="/api/common/file-download/demo.xlsx"
            download
          >
            下载
          </a>
        </div>
        <h4 className="m-t-6">文件上传</h4>
        <div>
          <div className="m-b-2">
            <span>标题1：</span>
            <div className="input">
              <input
                type="text"
                name="fileTitle"
                className="input-field"
                value={this.state.textInputs.get('fileTitle')}
                onChange={this.handleChangeInput('fileTitle')}
              />
            </div>
          </div>

          <div className="m-b-2">
            <span>文件1：</span>
            <div className="upload">
              <span>选择文件</span>
              <span className="upload-filename">
                {files.getIn(['myfile', 'fileName'])}
              </span>
              <span className="upload-filetype">
                {files.getIn(['myfile', 'fileType'])}
              </span>
              <input
                type="file"
                name="myfile"
                className="upload-file"
                onChange={this.handleChangeFile('myfile')}
              />
            </div>
          </div>

          <div className="m-b-2">
            <span>文件2：</span>
            <div className="upload">
              <span>选择文件</span>
              <span className="upload-filename">
                {files.getIn(['uploadFile2', 'fileName'])}
              </span>
              <span className="upload-filetype">
                {files.getIn(['uploadFile2', 'fileType'])}
              </span>
              <input
                type="file"
                name="uploadFile2"
                className="upload-file"
                onChange={this.handleChangeFile('uploadFile2')}
              />
            </div>
          </div>

          <div>
            <button
              className="btn btn-raised btn-primary"
              type="button"
              onClick={this.handleUploadFile}
            >
              上传
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default FileUpload;
