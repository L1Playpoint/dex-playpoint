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

    modifier _validateBuy(uint _usdtAmount, uint _ppttAmount){
        require(msg.sender != address(0), "Null Address Detected!");
        require(_usdtAmount > 0, "USDT amount request must be greater than 0!");
        require(PPTTToken.balanceOf(address(this)) >= _ppttAmount, "Insufficient PPTT in reserve!");
        require(USDTToken.balanceOf(msg.sender) >= _usdtAmount, "Insufficient USDT Balance!");
        require(USDTToken.allowance(msg.sender, address(this)) >= _usdtAmount, "Insufficient USDT Allowance!");
        _;
    }

    function buyPPTT(uint _usdtAmount, uint _ppttAmount) _validateBuy(_usdtAmount, _ppttAmount) public payable {
        USDTToken.transferFrom(msg.sender, address(this), _usdtAmount);
        PPTTToken.transfer(msg.sender, _ppttAmount);
    }

    function AddToWalletForLiquidity(uint _usdtAmount, uint _ppttAmount) _onlyLPOwner public {
        USDTToken.transfer(LPWallet, _usdtAmount);
        PPTTToken.transfer(LPWallet, _ppttAmount);
    }
}