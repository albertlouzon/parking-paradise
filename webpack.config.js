var webpack = require('webpack')
var CompressionPlugin = require('compression-webpack-plugin');


module.exports = {
  mode: 'production',
  entry: ['./src/index.js',
  ],
  
  output: {
    path: __dirname,
    exclude: [/node_modules/],
    publicPath: '/',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        loader: 'babel',
        exclude:[/node_modules/],
        query: {
          presets: ['react','es2015','stage-1']
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({ // <-- key to reducing React's size
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.DedupePlugin(), //dedupe similar code 
    new webpack.optimize.UglifyJsPlugin(), //minify everything
    new webpack.optimize.AggressiveMergingPlugin(),//Merge chunks 
    new CompressionPlugin({   
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ],
  watchOptions: {
    poll: 1000
  },
  resolve: {
    exclude:[/node_modules/],
    extensions: ['', '.js', '.jsx'],
   
  },
  devServer: { //doesnt seem to have an efffect
    host:'localhost',
    port:81,
    historyApiFallback: false,
    contentBase: './',
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  }
};
