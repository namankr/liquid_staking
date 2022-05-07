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

        describe('Yeild Farming', async () => {
            it('rewards token for staking', async() =>{
                let result;
                
                // check investor balance
                result = await zamp.balanceOf(customer)
                assert.equal(result.toString(), tokens('100'), 'customer wallet balance' )
            
                //check Staking For Customer of 100 tokens
                await zamp.approve(decentralBank.address, tokens('100'), {from:customer})
                await decentralBank.depositTokens(tokens('100'), {from:customer})

                //check Updated Balance of Customer
                result = await zamp.balanceOf(customer)
                assert.equal(result.toString(), tokens('0'), 'customer wallet balance after ')

                //check Updated Balance of Decentral Bank
                result = await zamp.balanceOf(decentralBank.address)
                assert.equal(result.toString(), tokens('100'), 'decentral bank wallet balance after staking from customer')


                //Is Staking Balance
                result = await decentralBank.isStaking(customer)
                assert.equal(result.toString(), 'true', 'customer is staking status after')

                //Issue tokens
                await decentralBank.issueTokens({from: owner})

                //Ensure only the Owner can issue tokens 
                 //await decentralBank.issueTokens({from:owner})


                //claim tokens 
                await decentralBank.claim({from: customer})

                //check claim balance
                result = await zamp.balanceOf(customer)
                assert.equal(result.toString(), tokens('100'), 'customer wallet balance after claim ')

                // check updated balance of Decentral bank
                result = await zamp.balanceOf(decentralBank.address)
                assert.equal(result.toString(), tokens('0'), 'decentral bank wallet balance after staking from customer')

                //Is Staking 
                result = await decentralBank.isStaking(customer)
                assert.equal(result.toString(), 'false', 'customer is staking status after')

            })
        })  
    })

})