const path = require('path');

module.exports = {
  entry: Path.resolve(__dirname,'../src/index.js'),
  output: {
    filename: 'build.js',
    path: path.resolve(__dirname, '../dist')
  },
}
