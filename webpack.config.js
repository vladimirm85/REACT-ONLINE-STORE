let path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let conf = {
  entry: './src/main.js',
  output: {
      path: path.resolve(__dirname, './dist/'),
      filename: '[name].js',
      publicPath: 'dist/'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
  module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: [
                "@babel/plugin-transform-react-jsx",
                ["@babel/plugin-proposal-decorators", { "legacy": true }],
                ["@babel/plugin-proposal-class-properties", { "loose": true }]
              ]
            }
          }
        },
        {
          test: /\.module\.css$/,
          exclude: /node_modules/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: process.env.NODE_ENV === 'development'
              }
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: {
                  localIdentName: '[local]__[sha1:hash:hex:7]'
                }
              }
            }
          ]
        },
        {
          test: /^((?!\.module).)*css$/,            
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: process.env.NODE_ENV === 'development'
              }
            },
            'css-loader'
          ]
        }
      ]
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
      '~c': path.resolve(__dirname, 'src/components'),
      '~p': path.resolve(__dirname, 'src/pages'),
      '~s': path.resolve(__dirname, 'src/store'),
      '~f': path.resolve(__dirname, 'src/forms')
    }
  },
  devServer: {
      historyApiFallback: true
  },
  optimization: {
      splitChunks: {
          cacheGroups: {
              vendors: {
                  name: `chunk-vendors`,
                  test: /[\\/]node_modules[\\/]/,
                  priority: -10,
                  chunks: 'initial'
              },
              common: {
                  name: `chunk-common`,
                  minChunks: 2,
                  priority: -20,
                  chunks: 'initial',
                  reuseExistingChunk: true
              }
          }
      }
  }
};

module.exports = conf;