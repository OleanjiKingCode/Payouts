// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Owned} from "solmate/auth/Owned.sol";

interface IERC20 {
    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external returns (bool);
}

/// @title Payouts
/// @author Oleanji
/// @notice A contract to pay editors

contract Payouts is Owned {
    /// -----------------------------------------------------------------------
    /// Errors
    /// -----------------------------------------------------------------------

    error PayoutsContract__PayoutFailed();
    error PayoutsContract__AddressCannotMakePayouts();
    error PayoutsContract__BalanceNotEnough();

    /// -----------------------------------------------------------------------
    /// Mapping
    /// -----------------------------------------------------------------------
    mapping(address => bool) public payerAddresses;

    /// -----------------------------------------------------------------------
    /// Constructor
    /// -----------------------------------------------------------------------
    constructor() Owned(msg.sender) {}

    /// -----------------------------------------------------------------------
    /// External functions
    /// -----------------------------------------------------------------------

    /// @notice Add address to payers
    /// @param payer The address to add
    function addAddress(address payer) external onlyOwner {
        payerAddresses[payer] = true;
        emit AddressToPayersList(payer, true);
    }

    /// @notice Remove address from payers
    /// @param payer The address to remove
    function removeAddress(address payer) external onlyOwner {
        payerAddresses[payer] = false;
        emit AddressToPayersList(payer, false);
    }

    /// @notice Single Payout
    /// @param receiver The address being transferred to
    function singlePayout(
        IERC20 token,
        address receiver,
        uint amount
    ) public {
        if (payerAddresses[msg.sender] == false)
            revert PayoutsContract__AddressCannotMakePayouts();
        if (token.balanceOf(msg.sender) < amount)
            revert PayoutsContract__BalanceNotEnough();
        bool success = token.transferFrom(msg.sender, receiver, amount);
        if (!success) revert PayoutsContract__PayoutFailed();

        emit TokenPayout(msg.sender, receiver, amount, address(token));
    }

    /// @notice Multiple Payout
    /// @param receivers The addresses being transferred to
    function multiplePayout(
        IERC20 token,
        address[] calldata receivers,
        uint[] calldata amounts
    ) external {
        uint totalAmount;
        for (uint i = 0; i < amounts.length; i++) {
            totalAmount += amounts[i + 1];
        }
        if (token.balanceOf(msg.sender) < totalAmount)
            revert PayoutsContract__BalanceNotEnough();

        for (uint i = 0; i < receivers.length; i++) {
            singlePayout(receivers[i + 1], amounts[i + 1]);
        }
    }

    /// -----------------------------------------------------------------------
    /// Events
    /// -----------------------------------------------------------------------
    event AddressToPayersList(address indexed _account, bool _action);

    event TokenPayout(
        address indexed _from,
        address _receiver,
        uint _amount,
        address _token
    );
}
