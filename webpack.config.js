const path = require('path')

module.exports = {
    entry: './offscreen/signin.js',
    output: {
        filename: 'bundled_signin.js',
        path: path.resolve(__dirname, "offscreen/dist")
    }
}