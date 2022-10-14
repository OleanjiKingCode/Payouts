import { BigInt } from "@graphprotocol/graph-ts";
import {
  Payouts,
  OwnerUpdated,
  AddressToPayersList,
  TokenPayout,
} from "../generated/Payouts/Payouts";
import { Editor, Payer, PayoutsRecord, Owner } from "../generated/schema";

export function handleAddressToPayersList(event: AddressToPayersList): void {
  let entity = Payer.load(event.params._account.toHexString());

  if (!entity) {
    entity = new Payer(event.params._account.toHexString());
  }

  entity.Address = event.params._account;
  entity.Date = event.block.timestamp.toString();
  let isAmong = event.params._action;
  entity.Deleted = !isAmong;
  entity.save();
}
export function handleOwnerUpdated(event: OwnerUpdated): void {
  let entity = Owner.load(event.block.timestamp.toString());

  if (!entity) {
    entity = new Owner(event.block.timestamp.toString());
  }
  entity.User = event.params.user;
  entity.Address = event.params.newOwner;
  entity.save();
}
export function handleTokenPayout(event: TokenPayout): void {
  let entity = PayoutsRecord.load(event.transaction.hash.toHexString());

  if (!entity) {
    entity = new PayoutsRecord(event.transaction.hash.toHexString());
  }

  entity.Rewards = event.params._amount.div(
    BigInt.fromI64(1000000000000000000)
  );
  entity.Date = event.block.timestamp.toString();
  entity.Sender = event.params._from;
  entity.Receiver = event.params._receiver;
  entity.Transaction = event.transaction.hash.toString();
  entity.TokenAddress = event.params._token;
  let rewards = event.params._amount.div(BigInt.fromI64(1000000000000000000));

  let new_entity = Editor.load(event.params._receiver.toHexString());

  if (new_entity) {
    rewards = new_entity.TotalRewards.plus(
      event.params._amount.div(BigInt.fromI64(1000000000000000000))
    );
  }

  if (!new_entity) {
    new_entity = new Editor(event.params._receiver.toHexString());
  }

  new_entity.Address = event.params._receiver;
  new_entity.TotalRewards = rewards;
  new_entity.save();
  entity.save();
}
