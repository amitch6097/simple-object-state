const path = require('path');
const { NODE_ENV, FILE_NAME } = process.env;
const filename = `${FILE_NAME}${NODE_ENV === 'production' ? '.min' : ''}.js`;
module.exports = {
  mode: NODE_ENV || 'development',
  entry: './src/index.ts',
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  module: {
    rules: [
        {
            test: /\.tsx?$/,
            loader: 'awesome-typescript-loader',
        },
    ]
    },
  output: {
    path: path.join(__dirname, 'dist/umd/'),
    filename,
    libraryTarget: 'umd',
  },
};