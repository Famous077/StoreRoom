// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract StudyRoom {

    // Store all members
    address[] public members;

    // Store study messages
    string[] public messages;

    // Constructor: runs only once, no input fields
    constructor() {
        // Optionally add the deployer as the first member
        members.push(msg.sender);
    }

    // Join the study room
    function joinRoom() public {
        members.push(msg.sender);
    }

    // Post a note or study message
    function postMessage(string memory _message) public {
        messages.push(_message);
    }

    // Total number of members
    function totalMembers() public view returns (uint) {
        return members.length;
    }

    // Total messages
    function totalMessages() public view returns (uint) {
        return messages.length;
    }
}

