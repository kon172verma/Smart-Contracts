// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

contract CampaignHub {
    address[] public campaigns;

    function createCampaign(uint256 amount, uint256 votingPercentage) public {
        Campaign newCampaign = new Campaign(
            msg.sender,
            amount,
            votingPercentage
        );
        campaigns.push(payable(address(newCampaign)));
    }

    function getCampaigns() public view returns (address[] memory) {
        return campaigns;
    }
}

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

    mapping(uint256 => Request) public requests;
    uint256 public requestsCount;

    constructor(
        address sender,
        uint256 amount,
        uint256 votingPercentage
    ) {
        owner = sender;
        approvalAmount = amount;
        minVotingPercentage = votingPercentage;
        contributorsCount = 0;
        approversCount = 0;
        requestsCount = 0;
    }

    modifier restricted() {
        require(msg.sender == owner, "Sender is not Owner");
        _;
    }

    function contribute() public payable {
        if (contributors[msg.sender] == 0) contributorsCount++;
        contributors[msg.sender] += msg.value;
    }

    function becomeApprover() public {
        require(
            contributors[msg.sender] >= approvalAmount,
            "Not enough contribution"
        );
        approvers[msg.sender] = true;
        approversCount++;
    }

    function revokeApprover() public {
        require(approvers[msg.sender], "Already not an approver");
        approvers[msg.sender] = false;
        approversCount--;
    }

    function addRequest(
        string memory description,
        uint256 value,
        address recepient
    ) public restricted {
        Request storage newRequest = requests[requestsCount];
        requestsCount++;
        newRequest.description = description;
        newRequest.value = value;
        newRequest.recepient = recepient;
        newRequest.yesCount = 0;
        newRequest.noCount = 0;
        newRequest.votesCount = 0;
        newRequest.complete = false;
    }

    // Votes --- 0: Not voted(default), 1: Yes, 2: No, 3: Don't Care.
    function approveRequest(uint256 requestId, uint8 vote) public {
        require(approvers[msg.sender], "Not an approver");
        require(requestId < requestsCount, "Invalid id");
        Request storage request = requests[requestId];
        require(request.votes[msg.sender] == 0, "Already voted");
        request.votes[msg.sender] = vote;
        request.votesCount++;
        if (vote == 1) {
            request.yesCount++;
        } else if (vote == 2) {
            request.noCount++;
        }
    }

    function finalizeRequest(uint256 requestId) public restricted {
        require(requestId < requestsCount, "Invalid id");
        Request storage request = requests[requestId];
        require(!requests[requestId].complete, "Already finalized");
        require(
            (request.votesCount / approversCount) * 100 >= minVotingPercentage,
            "Not enough approvers voted."
        );
        require(
            request.yesCount > request.noCount,
            "Not enough people approved"
        );
        payable(request.recepient).transfer(request.value);
        request.complete = true;
    }
}
