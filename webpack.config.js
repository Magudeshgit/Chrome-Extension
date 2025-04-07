const path = require('path')

module.exports = {
    mode: 'development',
    entry: './actual.js',
    output: {
        filename: 'bundled_actual.js',
        path: path.resolve(__dirname, "dist")
    },
    devServer: {
        // port: 9000,
        watchFiles: './',
        // contentBase: "offscreen",
        static: {
            directory: './',
          },
    }
}