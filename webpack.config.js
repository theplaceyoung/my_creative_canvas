const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.js',  // Entry
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',  // Output 파일
    assetModuleFilename: 'assets/[name][ext]'  // Output 파일
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']  // CSS 로더 설정
      },
      {
        test: /\.html$/,
        loader: 'html-loader'  // HTML 로더 설정 추가
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',  // JS 로더 설정 추가
        },
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.json'],  // 파일 확장자 처리
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'  // 템플릿으로 index.html을 사용
    })
  ]
};
