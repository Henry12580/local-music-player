// webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = [
  {
    mode: 'development',
    entry: './src/electron.ts',
    target: 'electron-main',
    module: {
      rules: [{
        test: /\.ts$/,
        include: /src/,
        use: [{ loader: 'ts-loader' }]
      }]
    },
    output: {
      path: __dirname + '/dist',
      filename: 'electron.js'
    },
    resolve: {
      extensions: ['.ts', '.js']
    }
  },
  {
    mode: 'development',
    entry: './src/preload.ts',
    target: 'electron-preload',
    module: {
      rules: [{
        test: /\.ts$/,
        include: /src/,
        use: [{ loader: 'ts-loader' }]
      }]
    },
    output: {
      path: __dirname + '/dist',
      filename: 'preload.js'
    }
  },
  {
    mode: 'development',
    entry: './src/React.tsx',
    target: 'electron-renderer',
    // devtool: 'source-map',
    module: { rules: [{
      test: /\.ts(x?)$/,
      include: /src/,
      use: [{ loader: 'ts-loader' }]
    }]},
    output: {
      path: __dirname + '/dist',
      filename: 'React.js'
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js'],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
      })
    ],
  },
];