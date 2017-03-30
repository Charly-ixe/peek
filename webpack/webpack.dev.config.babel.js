import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'

export default {
  context: path.resolve(__dirname, '..'),
  devtool: 'inline-source-map',
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true',
    './src/main.js'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  resolve: {
    root: path.resolve(__dirname, '..', 'src'),
    alias: {
      vue: 'vue/dist/vue.js',
      cannon: path.resolve(__dirname, '..', 'node_modules/cannon/src/Cannon.js'),
      dat: path.resolve(__dirname, '..', 'node_modules/dat.gui/build/dat.gui.js')
    },
    extensions: [
      '',
      '.js',
      '.jsx',
      '.json'
    ]
  },
  externals: {
    'TweenLite': 'TweenLite',
    'CSSPlugin': 'CSSPlugin'
  },
  module: {
    preLoaders: [
    ],
    loaders: [
      {
        test: /\.html?$/,
        exclude: /node_modules/,
        loader: 'html'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /node_modules/,
        loader: 'ify'
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /SplitText\.js$/,
        loader: 'imports?define=>false!exports?SplitText'
      },
      {
        test: /Draggable\.js$/,
        loader: 'imports?define=>false!exports?Draggable'
      },
      {
        test: /ScrollTo\.js$/,
        loader: 'imports?define=>false!exports?ScrollTo'
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loaders: ['style', 'css']
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loaders: ['style', 'css', 'sass']
      },
      {
        test: /\.styl$/,
        exclude: /node_modules/,
        loaders: ['style', 'css', 'stylus']
      },
      {
        test: /\.(glsl|frag|vert)$/,
        exclude: /node_modules/,
        loader: 'raw!glslify'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/template/index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      '__DEV__': JSON.stringify(true),
      '__PROD__': JSON.stringify(false)
    }),
    new webpack.ProvidePlugin({
      'Vue': 'vue',
      'THREE': 'three'
    }),
    new CopyWebpackPlugin([ { from: 'static' } ], { ignore: ['.DS_Store', '.keep'] })
  ]
}
