pragma solidity ^0.5.0;

import './stkZamp.sol';
import './Zamp.sol';

contract DecentralBank {
    string public name = 'Decentral Bank';
    address public owner;

    Zamp public zamp;
    stkZamp public stkzamp;

    constructor(Zamp _zamp, stkZamp _stkzamp) public {
        zamp = _zamp;
        stkzamp = _stkzamp;
    }

}