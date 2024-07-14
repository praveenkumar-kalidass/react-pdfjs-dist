const path = require("path");

module.exports = (...args) => ({
  entry: path.join(__dirname, "/src/index.ts"),
  mode: args[1].mode,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ]
  },
  output: {
    filename: args[1].mode === "production"
      ? "react-pdfjs-dist.min.js": "react-pdfjs-dist.js",
    path: path.join(__dirname, "/lib"),
    library: "ReactPdfjsDist",
    libraryTarget: "umd"
  },
  resolve: {
    extensions: [
      ".ts",
      ".tsx"
    ]
  },
  externals: {
    react: {
      root: "React",
      commonjs2: "react",
      commonjs: "react",
      amd: "react"
    }
  }
});