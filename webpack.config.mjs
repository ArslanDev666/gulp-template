import path from 'path';
import dotEnv from 'dotenv';

dotEnv.config();

const config = () => {
  const { NODE_ENV, SOURCE_FOLDER } = process.env;

  const __dirname = path.resolve();

  return {
    mode: NODE_ENV,
    entry: {
      index: path.resolve(__dirname, SOURCE_FOLDER, 'scripts', 'index.js'),
    },
    output: {
      filename: '[name].min.js',
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-env', { targets: 'defaults' }]],
            },
          },
        },
      ],
    },
  };
};

export default config;
