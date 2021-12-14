// SPDX-License-Identifier: GPL-3.0

// This line tells our program to use which version of solidity for compilation.
pragma solidity >=0.7.0 <0.9.0;

// Created a contract named Temp1 that stores a Value and allows the user to see and assign a new value.
contract Temp1 {
    // Value: private variable is used to store a value.
    uint256 private value = 7;

    // Declared a function to get the value of the variable value.
    function getValue() public view returns (uint256) {
        return value;
    }

    // Declared a function to set a value of the variable value.
    function setValue(uint256 val) public {
        value = val;
    }
}
