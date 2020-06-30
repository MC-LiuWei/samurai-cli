/*
 * @Author: 刘伟
 * @Date: 2020-06-27 16:45:22
 * @LastEditors: 刘伟
 * @LastEditTime: 2020-06-27 17:01:15
 * @Description: Do not edit
 * @FilePath: /samurai-cli/src/common/compilers/task/ui/webpack/react/index.ts
 */
import { join } from "path";
import { Configuration } from "webpack";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";

interface IReactWebpackOptions {
  entry: string;
  output: string;
  publics: string;
}

export default function reactWebpack(
  options: IReactWebpackOptions
): Configuration {
  return {
    mode: "development",
    entry: options.entry,
    output: {
      filename: "[hash].bundle.js",
      path: options.output,
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loader: "ts-loader",
          options: {
            transpileOnly: true,
            experimentalWatchApi: true,
          },
        },
        {
          test: /\.[(png)|(obj)|(json)]$/,
          loader: "file-loader",
        },
        {
          test: /\.(woff|woff2|jpg|png)$/,
          use: {
            loader: "url-loader",
            options: {
              name: "imanges/[hash].[ext]",
              limit: 5000,
              mimetype: "application/font-woff",
            },
          },
        },
      ],
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
    },
    devtool: "source-map",
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: "Zoe",
        template: join(options.publics, "index.html"),
      }),
    ],
  };
}
