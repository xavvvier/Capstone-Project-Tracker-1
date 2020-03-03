const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    name_form: './react/name-form.js',
    project_form: './react/project-form.js',
    stage_form: './react/stage-form.js',
    checkpoint_form: './react/checkpoint-form.js',
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
