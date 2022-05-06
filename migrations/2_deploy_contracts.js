const Zamp = artifacts.require('Zamp');
const stkZamp = artifacts.require('stkZamp');
const DecentralBank = artifacts.require('DecentralBank');

module.exports = async function (deployer, network, accounts) {
    
    // Deploy Zamp contract
    await deployer.deploy(Zamp)
    const zamp = await Zamp.deployed()

    // Deploy stkZamp contract 
    await deployer.deploy(stkZamp)
    const stk_zamp = await stkZamp.deployed()

    // Deploy DecentralBank contract
    await deployer.deploy(DecentralBank, stk_zamp.address, zamp.address)
    const decentralBank = await DecentralBank.deployed()

    //Transfer all stkZamp token to Decentral Bank
    await stk_zamp.transfer(decentralBank.address, '1000000000000000000000000')

    //Distribute 100 Zamp token to investor
    await zamp.transfer(accounts[1], '1000000000000000000')

};
