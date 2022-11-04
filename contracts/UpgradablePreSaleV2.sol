// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "./IMyToken.sol";

/**
 * @title PreSaleNft
 * @dev Pre Nft Access to  Users
 */

contract UpgradablePresaleV2 is OwnableUpgradeable, ReentrancyGuardUpgradeable {
    IMyToken public nft;
    struct PreSale {
        uint256 starttime;
        uint256 endtime;
        uint256 maxNftPerAddress;
        uint256 maxPreSaleNft;
        uint256 supply;
        uint256 listingFees;
    }
    PreSale preSale;

    struct Counters {
        uint256 nftCount;
        uint256 totalNft;
        uint256 totalSupply;
    }
    uint256 public totalfees;

    Counters counter;
    mapping(address => uint256) public nftminted;

    function initialize(IMyToken _nft) external {
        nft = _nft;
    }

    function mintToken() public payable nonReentrant {
        counter.totalNft++;
        counter.totalSupply++;
        require(preSale.endtime >= block.timestamp, "Pre Sale Ended");
        require(
            counter.totalNft <= preSale.maxPreSaleNft,
            "max mint amount per session exceeded"
        );
        require(
            preSale.supply >= counter.totalSupply,
            "Total Supply Limit Exceeded"
        );
        nftminted[msg.sender]++;
        counter.nftCount = nftminted[msg.sender];
        require(
            counter.nftCount <= preSale.maxNftPerAddress,
            "Your Minting Limit exceeded"
        );
        require(
            msg.value >= preSale.listingFees,
            "Please Pay Full Listing Fees"
        );
        payable(owner()).transfer(preSale.listingFees);
        totalfees = preSale.listingFees;
        nft.singleMint(msg.sender);
    }

    function setParam(
        uint256 _endtime,
        uint256 _maxNftPerAddress,
        uint256 _maxPreSaleNft,
        uint256 _supply,
        uint256 _listingFees
    ) public onlyOwner {
        preSale = PreSale(
            block.timestamp,
            block.timestamp + (_endtime * 60),
            _maxNftPerAddress,
            _maxPreSaleNft,
            _supply,
            _listingFees
        );
    }

    function getTotalFees() public view returns (uint) {
        return preSale.listingFees;
    }
}
