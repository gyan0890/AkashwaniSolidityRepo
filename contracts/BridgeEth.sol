pragma solidity ^0.6.0;

import './BridgeBase.sol';

contract BridgeEth is BridgeBase {
  constructor(address token) public BridgeBase(token) {}
}