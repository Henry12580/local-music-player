// webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = [
  {
    mode: 'production',
    entry: './src/electron.ts',
    target: 'electron-main',
    // watch: true,
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
    mode: 'production',
    entry: './src/preload.ts',
    target: 'electron-preload',
    // watch: true,
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
    mode: 'production',
    entry: './src/React.tsx',
    devServer: {
      port: 8080,
      hot: true,
    },
    module: { rules: [
      {
        test: /\.css$/,
        include: /css/,
        use: ['style-loader', 'css-loader']
      }, {
        test: /\.(jsx|js|tsx|ts)$/,
        include: /src/,
        loader: "babel-loader",
        options: {
          presets: ['@babel/preset-typescript', '@babel/preset-react'],
          plugins: ['@babel/plugin-transform-typescript']
        }
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        include: /src/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192, // 图片大小低于8KB时，转为base64编码
              name: 'images/[name].[hash:8].[ext]', // 输出文件名格式
            },
          },
        ],
      },
    ]},
    output: {
      path: __dirname + '/dist',
      filename: 'React.js'
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js'],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
    ],
  },
];