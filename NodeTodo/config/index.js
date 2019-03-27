//TODO: add encryption and decryption for login credentials
const configValues = require('./config');

module.exports = {

    getDbConnectionString: function () {
        return `mongodb://${configValues.uname}:${configValues.pwd}@ds119810.mlab.com:19810/node-todo`;
    }

}