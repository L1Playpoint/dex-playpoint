// SPDX-License-Identifier: MIT
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";

pragma solidity ^0.8.0;

contract SwapFactory{
    address payable public LPWallet;
    ERC20 public PPTTToken;
    ERC20 public USDTToken;

    constructor(address _pptt, address _usdt){
        LPWallet = payable(msg.sender);
        PPTTToken = ERC20(_pptt);
        USDTToken = ERC20(_usdt);
    }

    modifier _onlyLPOwner(){
        require(msg.sender == LPWallet, "Only LPWallet is authorised!");
        _;
    }

    function getPPTT(uint _amount) public payable {
        require(address(0) != msg.sender, "Null Address Detected!");
        PPTTToken.transfer(msg.sender, _amount);
    }

    function depositLP(uint _amount) public payable {
        USDTToken.transfer(LPWallet, _amount);
    }
}