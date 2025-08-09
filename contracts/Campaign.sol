// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Campaign {
    address public creator;
    uint256 public goal;
    uint256 public deadline;
    uint256 public totalContributions;
    mapping(address => uint256) public contributions;

    event Contribution(address indexed contributor, uint256 amount);
    event FundsClaimed(address indexed creator, uint256 amount);
    event Refund(address indexed contributor, uint256 amount);

    constructor(address _creator, uint256 _goal, uint256 _deadline) {
        creator = _creator;
        goal = _goal;
        deadline = _deadline;
    }

    function contribute() public payable {
        require(block.timestamp < deadline, "Campaign has ended");
        contributions[msg.sender] += msg.value;
        totalContributions += msg.value;
        emit Contribution(msg.sender, msg.value);
    }

    function claimFunds() public {
        require(msg.sender == creator, "Only creator can claim funds");
        require(block.timestamp >= deadline, "Campaign has not ended yet");
        require(totalContributions >= goal, "Campaign goal not reached");
        payable(creator).transfer(totalContributions);
        emit FundsClaimed(creator, totalContributions);
    }

    function getRefund() public {
        require(block.timestamp >= deadline, "Campaign has not ended yet");
        require(totalContributions < goal, "Campaign goal was reached");
        uint256 amount = contributions[msg.sender];
        require(amount > 0, "No contribution to refund");
        contributions[msg.sender] = 0;
        payable(msg.sender).transfer(amount);
        emit Refund(msg.sender, amount);
    }
}
