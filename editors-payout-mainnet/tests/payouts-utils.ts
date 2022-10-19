import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  AddressToPayersList,
  OwnerUpdated,
  TokenPayout
} from "../generated/Payouts/Payouts"

export function createAddressToPayersListEvent(
  _account: Address,
  _action: boolean
): AddressToPayersList {
  let addressToPayersListEvent = changetype<AddressToPayersList>(newMockEvent())

  addressToPayersListEvent.parameters = new Array()

  addressToPayersListEvent.parameters.push(
    new ethereum.EventParam("_account", ethereum.Value.fromAddress(_account))
  )
  addressToPayersListEvent.parameters.push(
    new ethereum.EventParam("_action", ethereum.Value.fromBoolean(_action))
  )

  return addressToPayersListEvent
}

export function createOwnerUpdatedEvent(
  user: Address,
  newOwner: Address
): OwnerUpdated {
  let ownerUpdatedEvent = changetype<OwnerUpdated>(newMockEvent())

  ownerUpdatedEvent.parameters = new Array()

  ownerUpdatedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  ownerUpdatedEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownerUpdatedEvent
}

export function createTokenPayoutEvent(
  _from: Address,
  _receiver: Address,
  _amount: BigInt,
  _token: Address
): TokenPayout {
  let tokenPayoutEvent = changetype<TokenPayout>(newMockEvent())

  tokenPayoutEvent.parameters = new Array()

  tokenPayoutEvent.parameters.push(
    new ethereum.EventParam("_from", ethereum.Value.fromAddress(_from))
  )
  tokenPayoutEvent.parameters.push(
    new ethereum.EventParam("_receiver", ethereum.Value.fromAddress(_receiver))
  )
  tokenPayoutEvent.parameters.push(
    new ethereum.EventParam(
      "_amount",
      ethereum.Value.fromUnsignedBigInt(_amount)
    )
  )
  tokenPayoutEvent.parameters.push(
    new ethereum.EventParam("_token", ethereum.Value.fromAddress(_token))
  )

  return tokenPayoutEvent
}
