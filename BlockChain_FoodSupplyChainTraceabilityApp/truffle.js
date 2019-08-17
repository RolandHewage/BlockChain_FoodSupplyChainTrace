// Allows us to use ES6 in our migrations and tests.
//require('babel-register')

module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*' // Match any network id
    },
    production: {
      host: 'bclu6m-dns-reg1.southeastasia.cloudapp.azure.com',
      port: 8545,
      network_id: '*', // Match any network id
      gas:375000

    }
  }
}
