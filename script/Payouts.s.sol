// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import {console} from "../lib/forge-std/src/console.sol";
import {Payouts} from "../src/Payouts.sol";

contract PayoutScript is Script {
    address constant owner = address(0xaCa39B187352D9805DECEd6E73A3d72ABf86E7A0);

    function run() external {
        console.log("Deploying Payouts contract....");
        vm.startBroadcast();

        Payouts payouts = new Payouts();
        console.log("Deployed Payouts contract", address(payouts));
        payouts.setOwner(owner);
        vm.stopBroadcast();
    }
}
