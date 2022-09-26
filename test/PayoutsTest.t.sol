// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/Payouts.sol";
import {MockERC20} from "../lib/solmate/src/test/utils/mocks/MockERC20.sol";

contract CounterTest is Test {
    Payouts public payouts;
    address alice = address(0x2);
    address doe = address(0x3);
    address babe = address(0x4);
    MockERC20 internal mockERC20;
    uint256 public constant Amount = 2e18;
    uint256 public constant mintAmount = 100e18;
    uint[] public amounts = [Amount, Amount];
    uint totalAmount = Amount + Amount;
    address[] public arrs = [babe, doe];

    function setUp() public {
        mockERC20 = new MockERC20("Mock Token", "MTN", 18);
        mockERC20.mint(alice, mintAmount);
        mockERC20.mint(doe, mintAmount);
        payouts = new Payouts();
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

    function testsinglePayout() public {
        payouts.addAddress(alice);

        vm.startPrank(alice);
        mockERC20.approve(address(payouts), Amount);
        uint alice_bal = mockERC20.balanceOf(alice);
        emit log_uint(alice_bal);
        payouts.singlePayout(address(mockERC20),doe, Amount);
        uint new_alice_bal = mockERC20.balanceOf(alice);
        assertEq(new_alice_bal, (mintAmount-Amount));
        vm.stopPrank();
    }

    function testmultiplePayout() public {
        payouts.addAddress(alice);

        // for 2 people

        vm.startPrank(alice);
        mockERC20.approve(address(payouts), totalAmount);
        uint old_alice_bal = mockERC20.balanceOf(alice);
        emit log_uint(old_alice_bal);
        payouts.multiplePayout(address(mockERC20),arrs, amounts);
        uint new_alice_bal = mockERC20.balanceOf(alice);
        assertEq(new_alice_bal, (mintAmount-Amount));
        vm.stopPrank();
    }
}
