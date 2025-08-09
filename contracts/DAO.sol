// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./NexusToken.sol";

contract DAO is Ownable {
    NexusToken public token;
    address[] public members;
    mapping(address => bool) public isMember;

    struct Proposal {
        uint256 id;
        string description;
        uint256 votes;
        bool executed;
        mapping(address => bool) voters;
    }

    uint256 public nextProposalId;
    mapping(uint256 => Proposal) public proposals;

    event ProposalCreated(uint256 id, string description);
    event Voted(uint256 proposalId, address indexed voter);

    constructor(address _tokenAddress) Ownable(msg.sender) {
        token = NexusToken(_tokenAddress);
    }

    function addMember(address _member) public onlyOwner {
        require(!isMember[_member], "Already a member");
        isMember[_member] = true;
        members.push(_member);
    }

    function createProposal(string memory _description) public {
        require(isMember[msg.sender], "Only members can create proposals");
        Proposal storage proposal = proposals[nextProposalId];
        proposal.id = nextProposalId;
        proposal.description = _description;
        proposal.votes = 0;
        proposal.executed = false;

        emit ProposalCreated(nextProposalId, _description);
        nextProposalId++;
    }

    function vote(uint256 _proposalId) public {
        require(isMember[msg.sender], "Only members can vote");
        Proposal storage proposal = proposals[_proposalId];
        require(!proposal.voters[msg.sender], "Already voted");

        uint256 votingPower = token.balanceOf(msg.sender);
        require(votingPower > 0, "No voting power");

        proposal.voters[msg.sender] = true;
        proposal.votes += votingPower;

        emit Voted(_proposalId, msg.sender);
    }
}