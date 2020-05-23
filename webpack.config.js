const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
    mode: mode,
    devtool: devtool,
    watch,
    entry: [
      './src/index.tsx',
    ],
    output: {
      filename: 'js/script.js',
      path: path.resolve(__dirname, 'dist'),
    },

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: 'index.html',
      }),
    ],

    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader"
                    }
                ]
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    }
  };

  return config;
};
