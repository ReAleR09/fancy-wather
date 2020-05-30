const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env, options) => {
  const isProduction = options.mode === 'production';

  const mode = isProduction ? 'production' : 'development';
  // Enable sourcemaps for debugging webpack's output.
  const devtool = isProduction ? 'none' : 'source-map';
  const watch = options.watch === 'true';

  const config = {
    devServer: {
      port: 8080,
    },
    mode,
    devtool,
    watch,
    entry: [
      './src/index.tsx',
      './src/styles/style.scss',
    ],
    output: {
      filename: 'js/script.js',
      path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },

    plugins: [
      new CleanWebpackPlugin(),
      new CopyPlugin({
        patterns: [
          { from: 'assets/', to: 'assets/' },
        ],
      }),
      new HtmlWebpackPlugin({
        template: 'index.html',
      }),
      new MiniCssExtractPlugin({
        filename: 'css/style.css',
      }),
    ],

    module: {
      rules: [
        {
          test: /\.ts(x?)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader',
            },
            {
              loader: 'eslint-loader',
              options: {
                cache: true,
                emitError: isProduction,
                failOnError: isProduction,
                emitWarning: isProduction,
                failOnWarning: isProduction,
              },
            },
          ],
        },
        // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
        {
          enforce: 'pre',
          test: /\.js$/,
          loader: 'source-map-loader',
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                url: false,
              },
            },
            'sass-loader',
          ],
        },
        {
          test: /\.html$/,
          loader: 'html-loader',
        },
      ],
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM',
    },
  };

  return config;
};
