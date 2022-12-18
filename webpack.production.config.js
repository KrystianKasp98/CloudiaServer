// @ts-nocheck
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.config.js');

const prodConfig = {
  mode: 'production',
};

module.exports = merge(baseConfig, prodConfig);
