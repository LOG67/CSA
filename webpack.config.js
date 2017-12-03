var nodeExternals = require('webpack-node-externals');
module.exports = options => {
  return [
    {
      target: "node",
      node: {
        __dirname: false,
        __filename: false,
      },
      externals: [nodeExternals()],
      entry: './src/Server/index.js',
      output: {
        path: __dirname + '/dist',
        filename: 'server.js',
      },
      module: {
        rules: [
          {
            test: /.js$/,
            exclude: /node_modules/,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  cacheDirectory: true,
                },
              },
            ],
          },
        ],
      },
    },
    {
      entry: './src/Client/App.jsx',
      output: {
        path: __dirname + '/dist/public',
        filename: 'bundle.js',
      },
      module: {
        rules: [
          {
            test: /.jsx?$/,
            exclude: /node_modules/,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  cacheDirectory: true,
                },
              },
            ],
          },
        ],
      },
    }
  ]
}
