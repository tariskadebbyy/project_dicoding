const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './app.js', // Titik masuk utama
  output: {
    filename: 'bundle.js', // File hasil bundling
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  mode: 'development', // Bisa diganti 'production' saat build final
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    open: true,
    hot: true,
    port: 8080,
    historyApiFallback: true, // Untuk SPA routing
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html', // Template HTML
      filename: 'index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/, // Untuk semua file .js
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Optional jika kamu pakai fitur ESNext
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/, // Untuk meng-handle import 'leaflet/dist/leaflet.css'
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i, // Untuk gambar
        type: 'asset/resource',
      },
    ],
  },
};
