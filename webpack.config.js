module.exports = {
  rules: [
    {
      test: /\.ts$/,
      exclude: /node_modules|vue\/src/,
      loader: "ts-loader",
      options: {
        appendTsSuffixTo: [/\.vue$/]
      }
    },
    {
      test: /\.s(c|a)ss$/,
      use: [
        'vue-style-loader',
        'css-loader',
        {
          loader: 'sass-loader',
          options: {
            implementation: require('sass'),
            sassOptions: {
              fiber: require('fibers'),
              indentedSyntax: true // optional
            },
          },
        },
      ],
    },
  ],
}