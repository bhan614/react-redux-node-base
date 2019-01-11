/**
 * 自动加载路由配置
 */
const fs = require('fs');
const path = require('path');
// const logger = require('digger-node').Logger;
const { URL_CONTEXT } = require('../../common/constants');

const rootPath = path.join(__dirname);

// api 前缀
const apiPrefix = 'api-ext';

// 后端接口路由
function apiExtRoutes(app) {
  const isFile = function(name) {
    return /\.js/.test(name);
  };
  /**
   * 递归添加api路由
   * @param routePath
   */
  const addApiRoute = function(routePath) {
    fs.readdirSync(routePath).forEach(pathName => {
      if (!isFile(pathName)) {
        addApiRoute(path.join(routePath, pathName)); // 递归添加子路由
      } else {
        // 路由相对路径
        const route = `${routePath.substring(rootPath.length)}/`;
        let routeName = route + pathName.replace(/.js/, '');
        routeName = routeName.replace(/\\/g, '/');

        const obj = require(`.${routeName}`);
        console.info(`add api route automatic:${URL_CONTEXT + routeName}`);
        app.use(URL_CONTEXT + routeName, obj);
      }
    });
  };

  // api路由配置
  addApiRoute(path.join(rootPath, apiPrefix));
}

module.exports = apiExtRoutes;
