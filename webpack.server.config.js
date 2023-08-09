const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = () => {
  const isProduction = process.env.NODE_ENV === 'production';

  return {
    mode: isProduction
      ? 'production'
      : 'development',
    entry: './src/server/index.ts',
    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, 'dist'),
    },
    node: {
      __dirname: false,
    },
    resolve: {
      extensions: [
        '.tsx',
        '.ts',
        '.js',
      ],
    },
    target: 'node',
    externals: [nodeExternals()],
    module: {
      rules: [
        {
          test: /\.tsx?$/u,
          use: 'ts-loader',
          exclude: /node_modules/u,
        },
        {
          test: /\.scss$/ui,
          use: [
            {
              loader: 'css-loader',
              options: {
                onlyLocals: true,
                modules: {
                  localIdentName: isProduction
                    ? '[hash:base64]'
                    : '[path][name]__[local]',
                  context: path.resolve(__dirname, 'src'),
                },
              },
            },
            {
              loader: 'sass-loader',
            },
          ],
        },
        {
          test: /\.(jpg|png|gif|svg|mp4|ttf)$/ui,
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
            emitFile: false,
          },
        },
      ],
    },
  };
};
