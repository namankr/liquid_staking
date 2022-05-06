const Zamp = artifacts.require('Zamp');
const stkZamp = artifacts.require('stkZamp');
const DecentralBank = artifacts.require('DecentralBank');

require('chai')
.use(require('chai-as-promised'))
.should()

contract('DecentralBank', (accounts) => {
    let zamp, reward;
    before(async ()=>{
        zamp = await Zamp.new()
        reward = await stkZamp.new()
    })
    
    describe('Fictional Zamp Deployment', async() =>{
        it('matches name successfully', async () =>{
            const name = await zamp.name()
            assert.equal(name, 'Zamp')
        })
    })

    describe('Reward Token', async() =>{
        it('matches name successfully', async () =>{
            const name = await reward.name()
            assert.equal(name, 'stkZamp')
        })
    })

})