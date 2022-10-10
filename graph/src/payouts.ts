import {
  Payouts,
  OwnerUpdated,
  AddressToPayersList,
  TokenPayout,
} from "../generated/Payouts/Payouts";
import { Editor, Payer, PayoutsRecord, Owner } from "../generated/schema";

export function handleAddressToPayersList(event: AddressToPayersList): void {
  let entity = Payer.load(event.block.timestamp.toString());

  if (!entity) {
    entity = new Payer(event.block.timestamp.toString());
  }

  entity.Address = event.params._account;
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
  let entity = PayoutsRecord.load(event.block.timestamp.toString());

  if (!entity) {
    entity = new PayoutsRecord(event.block.timestamp.toString());
  }

  entity.Rewards = event.params._amount;
  entity.Date = event.block.timestamp.toString();
  entity.Sender = event.params._from;
  entity.Receiver = event.params._receiver;
  entity.Transaction = event.transaction.hash.toString();
  entity.TokenAddress = event.params._token;

  let new_entity = Editor.load(event.block.timestamp.toString());
  if (!new_entity) {
    new_entity = new Editor(event.block.timestamp.toString());
  }

  new_entity.Address = event.params._receiver;
  if (new_entity.TotalRewards.isZero()) {
    new_entity.TotalRewards = event.params._amount;
  } else {
    let amount = new_entity.TotalRewards;
    new_entity.TotalRewards = amount.plus(event.params._amount);
  }

  new_entity.save();
  entity.save();
}
