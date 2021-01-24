const shajs = require('sha.js');

function getSHA256Digest(input)  { // returns SHA Digest in HEX as uppercased string
  return new shajs.sha256().update(input).digest('hex').toUpperCase();
}

exports.getSHA256Digest = getSHA256Digest;