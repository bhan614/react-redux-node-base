import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './components/Header';
import Footer from './components/Footer';
import Common from './components/Common';
import SideBar from './components/SideBar';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { Content, Sider } = Layout;

class App extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  // React 16 新增方法，用来处理错误边界，可以捕获整个子组件树内发生的任何异常
  componentDidCatch(error, errorInfo) {
    // 可以打印异常，或者往后端日志中发送异常，方便定位跟踪
    console.info(error);
    console.error(errorInfo);
  }

  render() {
    const contentStyle = {
      minHeight: `${window.innerHeight - 120}px`,
      width: '90%',
      background: '#fff',
      overflow: 'auto',
    };
    return (
      <Layout>
        <Header />
        <Content style={{ padding: '20px', boxShadow: '0 0 5px #ccc' }}>
          <Layout style={{ background: '#fff' }}>
            <Sider
              width={200}
              style={{ background: '#fff', borderRight: 'solid 1px #e9e9e9' }}
            >
              <SideBar />
            </Sider>
            <Content style={contentStyle}>{this.props.children}</Content>
          </Layout>
        </Content>
        <Footer />
        <Common />
      </Layout>
    );
  }
}

export default App;
