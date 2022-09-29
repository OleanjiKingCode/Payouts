// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/Payouts.sol";
import {MockERC20} from "../lib/solmate/src/test/utils/mocks/MockERC20.sol";

contract CounterTest is Test {
    Payouts private payouts;
    address private alice = address(0x2);
    address private doe = address(0x3);
    address private babe = address(0x4);
    MockERC20 private mockERC20;

    function setUp() public {
        mockERC20 = new MockERC20("Mock Token", "MTN", 18);
        uint256 mintAmount = 100e18;
        payouts = new Payouts();
        mockERC20.mint(address(payouts), mintAmount);
    }

    function testaddAddress() public {
        payouts.addAddress(alice);
        bool aPayer = payouts.payerAddresses(alice);
        assertTrue(aPayer);
    }

    function testremoveAddress() public {
        payouts.addAddress(alice);
        payouts.removeAddress(alice);
        bool isAPayer = payouts.payerAddresses(alice);
        assertTrue(!isAPayer);
    }

    function testFailPayoutsContract__BalanceNotEnough() public {
        Payouts newPayout;
        uint256 prankValue = 1e18;
        newPayout = new Payouts();
        newPayout.addAddress(alice);
        vm.startPrank(alice);
        newPayout.singlePayout(address(mockERC20), doe, prankValue);
        vm.expectRevert("PayoutsContract__BalanceNotEnough");
    }

    function testFailPayoutsContract__AddressCannotMakePayouts() public {
        uint256 prankValue = 1e18;
        vm.startPrank(doe);
        payouts.singlePayout(address(mockERC20), babe, prankValue);
        vm.expectRevert("PayoutsContract__AddressCannotMakePayouts");
    }

    function testFailPayoutsContract__PayoutFailed() public {
        uint256 prankValue = 1e18;
        address prankToken = address(0x0);
        payouts.addAddress(alice);
        vm.startPrank(alice);
        payouts.singlePayout(prankToken, doe, prankValue);
        vm.expectRevert("PayoutsContract__AddressCannotMakePayouts");
    }

    function testsinglePayout() public {
        uint256 payoutValue = 3e18;
        payouts.addAddress(alice);
        vm.startPrank(alice);
        payouts.singlePayout(address(mockERC20), doe, payoutValue);
        uint newBal = mockERC20.balanceOf(doe);
        assertEq(newBal, payoutValue);
        vm.stopPrank();
    }

    function testmultiplePayout() public {
        uint[] memory payoutValues = new uint[](2);
        payoutValues[0] = 3e18;
        payoutValues[1] = 4e18;

        address[] memory receivingAccounts = new address[](2);
        receivingAccounts[0] = babe;
        receivingAccounts[1] = doe;

        payouts.addAddress(alice);
        vm.startPrank(alice);

        payouts.multiplePayout(
            address(mockERC20),
            receivingAccounts,
            payoutValues
        );

        uint babeBal = mockERC20.balanceOf(address(babe));
        uint doeBal = mockERC20.balanceOf(address(doe));
        assertEq(babeBal, 3e18);
        assertEq(doeBal, 4e18);
        vm.stopPrank();
    }
}
