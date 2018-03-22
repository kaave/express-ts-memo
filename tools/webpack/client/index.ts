import webpack from 'webpack'; // tslint:disable-line
import path from 'path';
import fs from 'fs';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

const rules: webpack.Rule[] = [
  {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: 'awesome-typescript-loader',
  },
];
const resolve: webpack.Resolve = {
  modules: ['node_modules'],
  extensions: ['.tsx', '.ts', '.js'],
};
const plugins: webpack.Plugin[] = [
  new webpack.DefinePlugin({ 'process.env.NODE_ENV': "'development'" }),
  new webpack.LoaderOptionsPlugin({ debug: false }),
  new webpack.NamedModulesPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
];

const config: webpack.Configuration = {
  context: `${process.cwd()}/src`,
  devtool: 'inline-source-map',
  entry: path.join(process.cwd(), 'src', 'index.ts'),
  output: {
    path: path.join(process.cwd(), 'dist'),
    filename: 'client.js',
    publicPath: '/',
  },
  target: 'node',
  cache: true,
  module: { rules },
  resolve,
  plugins,
};

export default config;
