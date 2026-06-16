const path = require("node:path");
const packageJson = require("./package.json");

module.exports = {
  target: "node",
  mode: "production",
  entry: "./src/main.ts",
  output: {
    // Firebot loads a single CommonJS file whose module.exports is the script object.
    libraryTarget: "commonjs2",
    libraryExport: "default",
    path: path.resolve(__dirname, "dist"),
    filename: `${packageJson.scriptOutputName}.js`,
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    // Keep output readable; Firebot does not require minification.
    minimize: false,
  },
};
