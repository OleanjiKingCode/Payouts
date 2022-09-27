# Payouts




## Getting Started

run:

```sh
forge init
forge build
forge test
```

## Testing

```sh
    #test specific function with log
    forge test -vvv -m <functionName>

    #test all functions in a contract
    forge test --match-contract <contractName>

```

## Development

This project uses [Foundry](https://getfoundry.sh). See the [book](https://book.getfoundry.sh/getting-started/installation.html) for instructions on how to install and use Foundry.

## SCRIPTS

Deploy and verify a contract

```sh
# To load the variables in the .env file
source .env

# To deploy and verify our contract
forge script script/WikiNoValidator.s.sol:WikiNoValidator --rpc-url $RINKEBY_RPC_URL  --private-key $PRIVATE_KEY --broadcast --verify --etherscan-api-key $ETHERSCAN_KEY -vvvv --gas-price 60 --legacy

```
