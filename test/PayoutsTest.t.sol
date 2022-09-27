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
    uint[] public amounts = [2e18, 2e18];
    uint totalAmount = Amount + Amount;
    address[] public arrs = [babe, doe];

    function setUp() public {
        mockERC20 = new MockERC20("Mock Token", "MTN", 18);
       
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

    function testsinglePayout() public {
        payouts.addAddress(alice);

        vm.startPrank(alice);
        
        uint _bal = mockERC20.balanceOf(address(payouts));
        emit log_uint(_bal);
        payouts.singlePayout(address(mockERC20),doe, Amount);
        uint new_bal = mockERC20.balanceOf(address(payouts));
        assertEq(new_bal, 98e18);
        vm.stopPrank();
    }

    function testmultiplePayout() public {
        payouts.addAddress(alice);
        // for 2 people
        vm.startPrank(alice);
        uint old_bal = mockERC20.balanceOf(address(payouts));
        emit log_uint(old_bal);
        payouts.multiplePayout(address(mockERC20),arrs, amounts);
        uint new_bal = mockERC20.balanceOf(address(payouts));
        assertEq(new_bal, 96e18);
        vm.stopPrank();
    }
}
