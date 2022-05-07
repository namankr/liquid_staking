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

}