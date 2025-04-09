const path = require('path')

module.exports = {
    mode: 'production',
    entry: './offscreen.js',
    output: {
        filename: 'offscreen.js',
        path: path.resolve(__dirname, "dist")
    },
    // devServer: {
    //     // port: 9000,
    //     watchFiles: './',
    //     // contentBase: "offscreen",
    //     static: {
    //         directory: './',
    //       },
    // }
}