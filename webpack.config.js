const cesiumSource = 'node_modules/cesium/Source';
const cesiumWorkers = '../Build/Cesium/Workers';
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  resolve: {
    alias: {
      cesium: path.resolve(__dirname, cesiumSource, "Cesium")
    },
    fallback: {
      fs: false,
      Buffer: false,
      http: false,
      https: false,
      zlib: false
    },
    // mainFiles: ['Cesium']
  },
  plugins: [
    // Copy Cesium Assets, Widgets, and Workers to a static directory
    new CopyWebpackPlugin({
      patterns: [
        { from: path.join(cesiumSource, cesiumWorkers), to: 'Workers' },
        { from: path.join(cesiumSource, 'Assets'), to: 'Assets' },
        { from: path.join(cesiumSource, 'Widgets'), to: 'Widgets' }
      ]
    }),
    // new webpack.DefinePlugin({
    //   // Define relative base path in cesium for loading assets
    //   CESIUM_BASE_URL: JSON.stringify('')
    // })
  ],
};
