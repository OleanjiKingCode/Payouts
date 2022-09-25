// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "../lib/openzeppelin-contracts/contracts/access/Ownable.sol";
import "../lib/openzeppelin-contracts/contracts/utils/Counters.sol";
import "../lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";

error PayoutsContract__SinglePayoutFailed();
error PayoutsContract__MultiplePayoutsFailed();
error PayoutsContract__AddressAlreadyAdded();
error PayoutsContract__AddressNotYetAdded();
error PayoutsContract__AddressCannotMakePayouts();
error PayoutsContract__BalanceNotEnough();
error PayoutsContract__CannotPayZeroAddress();
error PayoutsContract__CannotAddZeroAddress();

contract Payouts is Ownable {
    using Counters for Counters.Counter;
    uint256 public number;
    address payable admin;
    address IqTokenAddress;
    Counters.Counter public noOfAllPayouts;
    Counters.Counter public noOfAllPayers;

    constructor(address _owner, address _tokenAddress) {
        admin = payable(_owner);
        IqTokenAddress = _tokenAddress;
    }

    struct payers {
        uint Id;
        address payersAddress;
        bool _isRemoved;
    }

    mapping(address => bool) public _payerAddresses;
    mapping(uint => payers) public idToPayers;

    event addressToPayersList(bool _action, address payer, bool isDeleted);

    event tokenPayout(
        uint payoutId,
        address payer,
        address receiver,
        uint amount,
        uint date
    );

    function addAddress(address _payer) public onlyOwner {
        if (_payer == address(0))
            revert PayoutsContract__CannotAddZeroAddress();
        if (_payerAddresses[_payer] == true)
            revert PayoutsContract__AddressAlreadyAdded();
        _payerAddresses[_payer] = true;
        noOfAllPayers.increment();
        uint currentNum = noOfAllPayers.current();
        idToPayers[currentNum] = payers(currentNum, _payer, false);
        emit addressToPayersList(true, _payer, false);
    }

    function removeAddress(address _payer) public onlyOwner {
        if (_payerAddresses[_payer] == false)
            revert PayoutsContract__AddressNotYetAdded();
        _payerAddresses[_payer] = false;
        uint currentNum = noOfAllPayers.current();
        for (uint i = 0; i < currentNum; i++) {
            if (idToPayers[i + 1].payersAddress == _payer) {
                idToPayers[i + 1]._isRemoved = true;
            }
        }
        emit addressToPayersList(false, _payer, true);
    }

    function getAllPayers() public view returns (payers[] memory) {
        uint currentNum = noOfAllPayers.current();
        uint currentIndex = 0;
        payers[] memory _payers = new payers[](currentNum);
        for (uint256 index = 0; index < currentNum; index++) {
            address payerAccount = idToPayers[index + 1].payersAddress;
            if (_payerAddresses[payerAccount] == true) {
                uint currentCount = idToPayers[index + 1].Id;
                payers storage all = idToPayers[currentCount];
                _payers[currentIndex] = all;
                currentIndex += 1;
            }
        }
        return _payers;
    }

    function singlePayout(address _receiver, uint amount) public payable {
        if (_receiver == address(0))
            revert PayoutsContract__CannotPayZeroAddress();
        if (_payerAddresses[msg.sender] == false)
            revert PayoutsContract__AddressCannotMakePayouts();
        if (IERC20(IqTokenAddress).balanceOf(msg.sender) < amount)
            revert PayoutsContract__BalanceNotEnough();
        bool success = IERC20(IqTokenAddress).transferFrom(
            msg.sender,
            _receiver,
            amount
        );
        if (!success) revert PayoutsContract__SinglePayoutFailed();

        noOfAllPayouts.increment();
        uint currentId = noOfAllPayouts.current();

        emit tokenPayout(
            currentId,
            msg.sender,
            _receiver,
            amount,
            block.timestamp
        );
    }

    function getAmountOfPayouts() public view returns (uint) {
        uint currentValue = noOfAllPayouts.current();
        return currentValue;
    }

    function getAmountOfPayers() public view returns (uint) {
        uint currentValue = noOfAllPayers.current();
        return currentValue;
    }

    function multiplePayout(
        address[] calldata _receivers,
        uint[] calldata amounts
    ) public payable {
        if (_payerAddresses[msg.sender] == false)
            revert PayoutsContract__AddressCannotMakePayouts();
        uint _totalAmount;
        for (uint i = 0; i < amounts.length; i++) {
            _totalAmount += amounts[i];
        }
        if (IERC20(IqTokenAddress).balanceOf(msg.sender) < _totalAmount)
            revert PayoutsContract__BalanceNotEnough();

        for (uint i = 0; i < _receivers.length; i++) {
            if (_receivers[i] == address(0))
                revert PayoutsContract__CannotPayZeroAddress();
            bool success = IERC20(IqTokenAddress).transferFrom(
                msg.sender,
                _receivers[i],
                amounts[i]
            );
            if (!success) revert PayoutsContract__SinglePayoutFailed();

            noOfAllPayouts.increment();
            uint currentId = noOfAllPayouts.current();

            emit tokenPayout(
                currentId,
                msg.sender,
                _receivers[i],
                amounts[i],
                block.timestamp
            );
        }
    }

    receive() external payable {}

    fallback() external payable {}
}
