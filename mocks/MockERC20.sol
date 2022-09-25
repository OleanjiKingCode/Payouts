// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "../lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";

contract MockIqToken is ERC20 {
    constructor(
        address first,
        address second,
        address third
    ) ERC20("Mock IQToken", "MIQ") {
        _mint(first, 200000e18);
        _mint(second, 200000e18);
        _mint(third, 200000e18);
    }
}
