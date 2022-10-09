import {
  Payouts,
  OwnerUpdated,
  AddressToPayersList,
  TokenPayout,
} from "../generated/Payouts/Payouts";
import { Editor, Payer, PayoutsRecord, Owner } from "../generated/schema";

export function handleAddressToPayersList(event: AddressToPayersList): void {
  let entity = Payer.load(event.params._account.toString());

  if (!entity) {
    entity = new Payer(event.params._account.toString());
  }

  entity.Address = event.params._account;
  let isAmong = event.params._action;
  entity.Deleted = !isAmong;
  entity.save();
}
export function handleOwnerUpdated(event: OwnerUpdated): void {
  let entity = Owner.load(event.params.user.toString());

  if (!entity) {
    entity = new Owner(event.params.user.toString());
  }

  entity.Address = event.params.newOwner;
  entity.save();
}
export function handletokenPayout(event: TokenPayout): void {
  let entity = PayoutsRecord.load(event.transaction.hash.toString());

  if (!entity) {
    entity = new PayoutsRecord(event.transaction.hash.toString());
  }

  entity.Rewards = event.params._amount;
  entity.Date = event.block.timestamp.toString();
  entity.Sender = event.params._from;
  entity.Receiver = event.params._receiver;
  entity.Transaction = event.transaction.hash.toString();

  let new_entity = Editor.load(event.params._receiver.toString());
  if (!new_entity) {
    new_entity = new Editor(event.params._receiver.toString());
  }

  new_entity.Address = event.params._receiver;
  let current_amount = new_entity.TotalRewards;
  current_amount.plus(event.params._amount);
  new_entity.TotalRewards = current_amount;

  new_entity.save();
  entity.save();
}
