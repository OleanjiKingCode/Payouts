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
    uint256 public constant mintAmount = 100e18;
    uint[] public _amountsArray = [3e18, 4e18];
    address[] public _addressesArray = [babe, doe];

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
        payouts.singlePayout(address(mockERC20),_addressesArray[0], _amountsArray[0]);
        uint new_bal = mockERC20.balanceOf(_addressesArray[0]);
        assertEq(new_bal, _amountsArray[0]);
        vm.stopPrank();
    }

    function testmultiplePayout() public {
        payouts.addAddress(alice);
        // for 2 people
        vm.startPrank(alice);
        payouts.multiplePayout(address(mockERC20),_addressesArray, _amountsArray);
        uint babe_bal = mockERC20.balanceOf(address(babe));
        uint doe_bal = mockERC20.balanceOf(address(doe));
        assertEq(babe_bal, 3e18);
        assertEq(doe_bal, 4e18);
        vm.stopPrank();
    }
}
