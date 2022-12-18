// @ts-nocheck
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.config.js");

const devConfig = {
  mode: "development",
};

module.exports = merge(baseConfig, devConfig);
