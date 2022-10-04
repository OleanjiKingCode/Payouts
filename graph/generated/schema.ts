// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class PayoutsRecord extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save PayoutsRecord entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type PayoutsRecord must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("PayoutsRecord", id.toString(), this);
    }
  }

  static load(id: string): PayoutsRecord | null {
    return changetype<PayoutsRecord | null>(store.get("PayoutsRecord", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get Sender(): Bytes {
    let value = this.get("Sender");
    return value!.toBytes();
  }

  set Sender(value: Bytes) {
    this.set("Sender", Value.fromBytes(value));
  }

  get Receiver(): Bytes {
    let value = this.get("Receiver");
    return value!.toBytes();
  }

  set Receiver(value: Bytes) {
    this.set("Receiver", Value.fromBytes(value));
  }

  get Date(): string {
    let value = this.get("Date");
    return value!.toString();
  }

  set Date(value: string) {
    this.set("Date", Value.fromString(value));
  }

  get Rewards(): BigInt {
    let value = this.get("Rewards");
    return value!.toBigInt();
  }

  set Rewards(value: BigInt) {
    this.set("Rewards", Value.fromBigInt(value));
  }

  get Transaction(): string {
    let value = this.get("Transaction");
    return value!.toString();
  }

  set Transaction(value: string) {
    this.set("Transaction", Value.fromString(value));
  }

  get TokenAddress(): Bytes {
    let value = this.get("TokenAddress");
    return value!.toBytes();
  }

  set TokenAddress(value: Bytes) {
    this.set("TokenAddress", Value.fromBytes(value));
  }
}

export class Editors extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Editors entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Editors must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Editors", id.toString(), this);
    }
  }

  static load(id: string): Editors | null {
    return changetype<Editors | null>(store.get("Editors", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get Address(): Bytes {
    let value = this.get("Address");
    return value!.toBytes();
  }

  set Address(value: Bytes) {
    this.set("Address", Value.fromBytes(value));
  }

  get TotalRewards(): BigInt {
    let value = this.get("TotalRewards");
    return value!.toBigInt();
  }

  set TotalRewards(value: BigInt) {
    this.set("TotalRewards", Value.fromBigInt(value));
  }
}

export class Payers extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Payers entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Payers must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Payers", id.toString(), this);
    }
  }

  static load(id: string): Payers | null {
    return changetype<Payers | null>(store.get("Payers", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get Address(): Bytes {
    let value = this.get("Address");
    return value!.toBytes();
  }

  set Address(value: Bytes) {
    this.set("Address", Value.fromBytes(value));
  }

  get Deleted(): boolean {
    let value = this.get("Deleted");
    return value!.toBoolean();
  }

  set Deleted(value: boolean) {
    this.set("Deleted", Value.fromBoolean(value));
  }
}
