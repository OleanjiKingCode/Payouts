// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import {Payouts} from "../src/Payouts.sol";

contract PayoutScript is Script {
    function setUp() public {}

    function run() external {
        vm.startBroadcast();

        new Payouts(
            0xcF4E7c44d50b8de9796f236987E8729a6A5c0fe0,
            0xB9638272aD6998708de56BBC0A290a1dE534a578
        );

        vm.stopBroadcast();
    }
}
