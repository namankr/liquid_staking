// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './stkZamp.sol';
import './Zamp.sol';

contract DecentralBank {
    string public name = 'Decentral Bank';
    address public owner;

    Zamp public zamp;
    stkZamp public stkzamp;

    constructor(Zamp _zamp, stkZamp _stkzamp) {
        zamp = _zamp;
        stkzamp = _stkzamp;
    }

    address[] public stakers;
    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    //staking functions
    function depositTokens(uint _amount) public {
        //require Staking amount cannot be Zero
        require(_amount>0, 'amount cannot be zero');

        // Transfer zamp tokens to this contract address for staking
        zamp.transferFrom(msg.sender, address(this), _amount);
    
        //update Staking Balance
        stakingBalance[msg.sender] = stakingBalance[msg.sender] +_amount;

        if(!hasStaked[msg.sender]){
            stakers.push(msg.sender);
        }

        //Update Staking Balance

        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;

    }

    function issueTokens() public {

        require(msg.sender == owner, 'only owner can issue rewards');

        for(uint i=0; i<stakers.length; i++){
            address recipient = stakers[i];
            uint balance = stakingBalance[recipient]/9; // div by 9 to create percentage incentives
            if(balance>0){
                stkzamp.transfer(recipient, balance);
            }
        }
    }

    function claim() public {

        uint balance = stakingBalance[msg.sender];
        

        require(balance>0 , 'staking balance cannot be less than zero');

        //transfer the tokens to the specified address from contract
        zamp.transfer(msg.sender, balance);
        
        // reset the staking balance
        stakingBalance[msg.sender] =0;

        //update the Staking status
        isStaking[msg.sender] = false;

    }

}