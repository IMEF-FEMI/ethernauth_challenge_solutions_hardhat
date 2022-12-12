// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract MagicNum {

  address public solver;

  constructor() public {}

  function setSolver(address _solver) public {
    solver = _solver;
  }

  /*
    ____________/\\\_______/\\\\\\\\\_____        
     __________/\\\\\_____/\\\///////\\\___       
      ________/\\\/\\\____\///______\//\\\__      
       ______/\\\/\/\\\______________/\\\/___     
        ____/\\\/__\/\\\___________/\\\//_____    
         __/\\\\\\\\\\\\\\\\_____/\\\//________   
          _\///////////\\\//____/\\\/___________  
           ___________\/\\\_____/\\\\\\\\\\\\\\\_ 
            ___________\///_____\///////////////__
  */
}

contract MagicNumAttack{
    MagicNum challenge;

    constructor(address _challenge) public{
        challenge = MagicNum(_challenge);
    }

    function attack() public {
        bytes memory bytecode = hex"600a600c600039600a6000f3602a60505260206050f3";
        bytes32 salt = 0;
        address solver;

        assembly {
            solver := create2(
                0,//call value // wei sent with current call
                add(bytecode, 0x20),// Actual code starts after skipping the first 32 bytes
                mload(bytecode),// Load the size of code contained in the first 32 bytes
                salt
            )
        }
        challenge.setSolver(solver);
    }
}