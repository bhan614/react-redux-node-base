import React from 'react';
import classNames from 'classnames';
import { URL_CONTEXT } from '../../../common/constants';
import { NavLink } from 'dva/router';
import { Layout, Menu, Icon, Avatar } from 'antd';
const { Header } = Layout;
const SubMenu = Menu.SubMenu;

const HeaderModule = () => {
  const { pathname } = document.location;

  return (
    <Header className="header-content">
      <div className="header-logo" />
      <Menu mode="horizontal" className="ant-avatar-wrap">
        <SubMenu
          title={
            <span className="ant-avatar-wraper">
              <Avatar src="" className="ant-avatar" />
              白涵
            </span>
          }
        >
          <Menu.Item key="user">
            <a href="">
              <Icon type="user" />
              用户中心
            </a>
          </Menu.Item>
          <Menu.Item key="logout">
            <a href="/">
              <Icon type="logout" />
              退出
            </a>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Header>
  );
};

export default HeaderModule;
