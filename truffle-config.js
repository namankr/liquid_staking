require('babel-register');
require('babel-polyfill');

module.exports = {
    networks:{
        development:{
            host:'127.0.0.1:7545',
            port:7545,
            network_id: '*' // connect to any network
        },
    },
    constracts_directory: './src/contracts/',
    constracts_buid_directory: './src/truffle_abis/',
    compilers:{
        solc:{
            version: '^0.5.0',
            optimizer:{
                enabled: true,
                run:200
            },
        }
    }
}