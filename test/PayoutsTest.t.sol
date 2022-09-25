// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/Payouts.sol";
import "../mocks/MockERC20.sol";

contract CounterTest is Test {
    Payouts public payouts;
    address bob = address(0x1);
    address alice = address(0x2);
    address doe = address(0x3);
    address babe = address(0x4);
    MockIqToken public IqToken;
    uint256 public constant Amount = 2e18;
    uint[] public amounts = [Amount, Amount];
    uint totalAmount = Amount + Amount;
    address[] public arrs = [babe, doe];

    function setUp() public {
        IqToken = new MockIqToken(bob, alice, doe);
        payouts = new Payouts(bob, address(IqToken));
    }

    function testaddAddress() public {
        payouts.addAddress(alice);
        bool aPayer = payouts._payerAddresses(alice);
        assertTrue(aPayer);
    }

    function testremoveAddress() public {
        payouts.addAddress(alice);
        uint currentAmount = payouts.getAmountOfPayers();
        emit log_named_uint("Added alice ", currentAmount);
        payouts.removeAddress(alice);
        bool aPayer = payouts._payerAddresses(alice);
        assertTrue(!aPayer);
    }

    function testsinglePayout() public {
        payouts.addAddress(alice);
        uint currentAmount = payouts.getAmountOfPayouts();
        emit log_uint(currentAmount);

        vm.startPrank(alice);
        IqToken.approve(address(payouts), Amount);
        uint val = IqToken.balanceOf(alice);
        emit log_uint(val);

        payouts.singlePayout(doe, Amount);
        vm.stopPrank();
        uint presentAmount = payouts.getAmountOfPayouts();
        emit log_uint(presentAmount);

        assertEq(presentAmount, 1);
    }

    function testmultiplePayout() public {
        payouts.addAddress(alice);
        uint currentAmount = payouts.getAmountOfPayouts();
        emit log_uint(currentAmount);

        // for 2 people

        vm.startPrank(alice);
        IqToken.approve(address(payouts), totalAmount);
        uint val = IqToken.balanceOf(alice);
        emit log_uint(val);

        payouts.multiplePayout(arrs, amounts);
        vm.stopPrank();
        uint presentAmount = payouts.getAmountOfPayouts();
        emit log_uint(presentAmount);

        assertEq(presentAmount, 2);
    }
}
