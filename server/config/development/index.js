/**
 * 环境配置-本地开发环境
 */
const config = require('./base');

const NODE_ENV = (process.env.NODE_ENV = 'development');
const SERVER_URL = (process.env.SERVER_URL = 'http://10.26.14.42:5108/');

const _config = { ...config, NODE_ENV, SERVER_URL };

module.exports = _config;
