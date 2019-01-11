import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon } from 'antd';
import { NavLink } from 'dva/router';
import { URL_CONTEXT } from '../../../common/constants';

class SideBar extends Component {
  state = {
    current: 'home',
  };

  componentDidMount() {
    const { pathname } = location;
    if (pathname.indexOf(`${URL_CONTEXT}/home`) !== -1) {
      this.setMenuKey('home');
    } else if (pathname.indexOf(`${URL_CONTEXT}/example`) !== -1) {
      this.setMenuKey('example');
    } else if (pathname.indexOf(`${URL_CONTEXT}/about`) !== -1) {
      this.setMenuKey('about');
    } else if (pathname.indexOf(`${URL_CONTEXT}/todos`) !== -1) {
      this.setMenuKey('todos');
    } else {
      this.setMenuKey('home');
    }
  }

  setMenuKey = key => {
    this.setState({
      current: key,
    });
  };

  handleClick = e => {
    console.log('click ', e.key);
    this.setMenuKey(e.key);
  };

  render() {
    return (
      <Menu
        onClick={this.handleClick}
        defaultSelectedKeys={['home']}
        selectedKeys={[this.state.current]}
        mode="inline"
      >
        <Menu.Item key="home" style={{ fontSize: '14px' }}>
          <NavLink to={`${URL_CONTEXT}/home`}>
            <Icon type="home" />
            Home
          </NavLink>
        </Menu.Item>
        <Menu.Item key="example" style={{ fontSize: '14px' }}>
          <NavLink to={`${URL_CONTEXT}/example`}>
            <Icon type="layout" />
            example
          </NavLink>
        </Menu.Item>
        <Menu.Item key="todos" style={{ fontSize: '14px' }}>
          <NavLink to={`${URL_CONTEXT}/todos`}>
            <Icon type="flag" />
            Todos
          </NavLink>
        </Menu.Item>
        <Menu.Item key="about" style={{ fontSize: '14px' }}>
          <NavLink to={`${URL_CONTEXT}/about`}>
            <Icon type="contacts" />
            About
          </NavLink>
        </Menu.Item>
      </Menu>
    );
  }
}

export default SideBar;
