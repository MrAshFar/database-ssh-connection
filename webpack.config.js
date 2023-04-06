const path = require("path");

module.exports = {
  resolve: {
    fallback: {
      fs: false,
      tls: false,
      net: false,
      path: false,
      zlib: false,
      http: false,
      https: false,
      stream: false,
      crypto: false,
      buffer: false,
      util: false,
      assert: false,
      dns: false,
      process: false,
      timers: false,
      url: false,
      child_process: false,
      string_decoder: false,
      os: false,
    },
  },
  entry: "./src/app.js",
  mode: "production",
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.node$/,
        loader: "node-loader",
      },
    ],
  },
};
