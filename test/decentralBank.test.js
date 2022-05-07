const Zamp = artifacts.require('Zamp');
const stkZamp = artifacts.require('stkZamp');
const DecentralBank = artifacts.require('DecentralBank');

require('chai')
.use(require('chai-as-promised'))
.should()

contract('DecentralBank', ([owner, customer]) => {
    let zamp, reward, decentralBank;

    function tokens(number){
        return web3.utils.toWei(number, 'ether')
    }

    before(async ()=>{
        // load contracts
        zamp = await Zamp.new()
        reward = await stkZamp.new()
        decentralBank = await DecentralBank.new(zamp.address, reward.address) 

        // transfer all token to DecentralBank (1 million)
        await reward.transfer(decentralBank.address, tokens('1000000'))

        // transfer 100 Zamp tokens to customer
        await zamp.transfer(customer, tokens('100'), {from:owner})

    })
    
    describe('Fictional Zamp token Deployment', async() =>{
        it('matches name successfully', async () =>{
            const name = await zamp.name()
            assert.equal(name, 'Zamp')
        })
    })

    describe(' stkZamp Reward Token', async() =>{
        it('matches name successfully', async () =>{
            const name = await reward.name()
            assert.equal(name, 'stkZamp')
        })
    })

    describe('Decentral Bank Deployment', async() =>{
        it('matches name successfully', async () =>{
            const name = await decentralBank.name()
            assert.equal(name, 'Decentral Bank')
        })

        it('contract has tokens', async () =>{
            let balance = await reward.balanceOf(decentralBank.address)
            assert.equal(balance, tokens('1000000'))
        })
    })

})