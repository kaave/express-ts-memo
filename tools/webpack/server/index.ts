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
  extensions: ['.tsx', '.ts', '.js'],
  plugins: [new TsconfigPathsPlugin({ configFile: path.join(process.cwd(), 'tsconfig.json') })],
};
const externals: webpack.ExternalsObjectElement = fs
  .readdirSync('node_modules')
  .filter(x => !['.bin'].includes(x))
  .reduce((tempMods: { [key: string]: string }, mod) => {
    tempMods[mod] = `commonjs ${mod}`;
    return tempMods;
  }, {});
const plugins: webpack.Plugin[] = [
  new webpack.BannerPlugin({ banner: 'require("source-map-support").install();', raw: true, entryOnly: false }),
  new webpack.DefinePlugin({ 'process.env.NODE_ENV': "'development'" }),
  new webpack.LoaderOptionsPlugin({ debug: false }),
];

const config: webpack.Configuration = {
  context: process.cwd(),
  devtool: 'inline-source-map',
  entry: path.join(process.cwd(), 'src', 'server', 'index.ts'),
  output: {
    path: path.join(process.cwd(), 'dist'),
    filename: 'server.js',
  },
  target: 'node',
  cache: true,
  module: { rules },
  resolve,
  externals,
  plugins,
};

export default config;
