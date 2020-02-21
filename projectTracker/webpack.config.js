const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    like_button: './react/like_button.jsx',
    header: './react/header.jsx'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'wwwroot/js/react'),
  },
  optimization: {
     splitChunks: {
       chunks: 'all',
       name: 'vendor'
     },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
	        loader: "babel-loader",
	        options: {
	        	presets: ["@babel/preset-env", "@babel/preset-react"]
	        }
        }
      }
    ]
  }
};