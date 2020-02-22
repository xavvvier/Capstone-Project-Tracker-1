const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    hello: './react/hello.js',
    name_form: './react/NameForm.js'
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
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: {
	        loader: "babel-loader",
	        options: {
                presets: ["@babel/preset-env", "@babel/preset-react"],
                plugins: ['transform-class-properties']
	        }
        }
      }
    ]
  }
};