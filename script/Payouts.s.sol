// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import {console} from "../lib/forge-std/src/console.sol";
import {Payouts} from "../src/Payouts.sol";

contract PayoutScript is Script {
    address constant owner = address(0xf2445f8FEEfef350ac1756F67C62938a37eDa375);

    function run() external {
        console.log("Deploying Payouts contract....");
        vm.startBroadcast();

        Payouts payouts = new Payouts();
        console.log("Deployed Payouts contract", address(payouts));
        payouts.setOwner(owner);
        vm.stopBroadcast();
    }
}
