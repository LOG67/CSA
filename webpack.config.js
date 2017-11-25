module.exports = options => {
  return [
    // {
    //   entry: './src/Server/index.js',
    //   output: {
    //     filename: 'dist/server.js',
    //   },
    //   module: {
    //     rules: [
    //       {
    //         test: /.js$/,
    //         exclude: /node_modules/,
    //         use: [
    //           {
    //             loader: 'babel-loader',
    //             options: {
    //               cacheDirectory: true,
    //             },
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // },
    {
      entry: './src/Client/App.jsx',
      output: 'dist/bundle.js',
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
