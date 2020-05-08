const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  target: 'electron-renderer',
  entry: './src/index.tsx',
  // キャッシュを使って差分ビルドする
  cache: true,
  // development は、 source map file を作成、再ビルド時間の短縮などの設定となる
  // production は、コードの圧縮やモジュールの最適化が行われる設定となる
  mode: 'development', // "production" | "development" | "none"
  // ソースマップのタイプ
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  externals: [
    // ../build/Debug/iconv.node が iconv から
    {"../build/Debug/iconv.node": 'debug-iconv-node'},
  ],
  module: {
    rules: [
      {
        // コンパイルの事前に eslint によるチェックをする
        // 拡張子 .ts または .tsx の場合
        test: /\.tsx?$/,
        enforce: 'pre', // 事前処理
        loader: 'eslint-loader',
      },
      {
        test: /\.node$/,
        use: 'node-loader',
        exclude: '/Debug/iconv.node',
      },
      {
        // typescript のコンパイルの設定
        // 拡張子 .ts または .tsx の場合
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: [
      '.ts',
      '.tsx',
      '.js', // node_modulesのライブラリ読み込みに必要
      '.node', // iconv で必要
    ],
  },
  node: {
    // active-win を動かすためにこれが必要
    // active-win には main というシェルスクリプトが動いており
    // それを webpack のビルドに含める必要がある
    __dirname: true,
  },
  plugins: [
    // Webpack plugin を利用する
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
    }),
  ],
};
