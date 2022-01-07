// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

contract Campaign {
    struct Request {
        string description;
        uint256 value;
        address recepient;
        mapping(address => uint8) votes;
        uint256 yesCount;
        uint256 noCount;
        uint256 votesCount;
        bool complete;
    }

    address public owner;
    uint256 public approvalAmount;
    uint256 public minVotingPercentage;

    mapping(address => uint256) public contributors;
    uint256 public contributorsCount;
    mapping(address => bool) public approvers;
    uint256 public approversCount;

    mapping(uint256 => Request) Requests;
    uint256 requestsCount;

    constructor(
        address sender,
        uint256 amount,
        uint256 votingPercentage
    ) {
        owner = sender;
        approvalAmount = amount;
        minVotingPercentage = votingPercentage;
    }

    function contribute() public payable {
        contributors[msg.sender] += msg.value;
    }

    function becomeApprover() public {
        require(
            contributors[msg.sender] >= approvalAmount,
            "Not enough contribution."
        );
        approvers[msg.sender] = true;
    }

    function revokeApprover() public {
        require(approvers[msg.sender], "Already not an approver.");
        approvers[msg.sender] = false;
    }
}
