import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isRunningWebpack = !!process.env.WEBPACK;
const isRunningRspack = !!process.env.RSPACK;
if (!isRunningRspack && !isRunningWebpack) {
  throw new Error('Unknown bundler');
}
/**
 * @type {import('webpack').Configuration | import('@rspack/cli').Configuration}
 */
const config = {
  mode: 'development',
  devtool: false,
  entry: {
    main: './src/index.ts',
  },
  resolve: {
    extensions: ['.ts'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: isRunningRspack ? 'builtin:swc-loader' : 'swc-loader',
          /** @type {import('@swc/core').Config} */
          options: {
            jsc: {
              target: 'es2015',
              parser: {
                syntax: 'typescript',
              },
            },
          },
        },
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin()],
  output: {
    clean: true,
    path: isRunningWebpack
      ? path.resolve(__dirname, 'webpack-dist')
      : path.resolve(__dirname, 'rspack-dist'),
    filename: '[name].js',
  },
  experiments: {
    css: false,
  },
};
export default config;
