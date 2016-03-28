module.exports = {
  entry: "./src/app.js",
  output: {
    path: __dirname + "/public/js",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        //further option is defined at .babelrc
      }
    ]
  }
}
