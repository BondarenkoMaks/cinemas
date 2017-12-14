const nconf = require('nconf');
const path = require('path');
nconf.argv()
    .env()
    .file({ file: path.join(__dirname, 'config.json')});
module.exports = nconf;

//"mongodb://admin:admin@ds135946.mlab.com:35946/cinemasdb"
