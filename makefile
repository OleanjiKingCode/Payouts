-include .env

script-mainnet:;
        forge script script/Payouts.s.sol:PayoutScript --rpc-url ${MUMBAI_RPC_URL} --private-key ${PRIVATE_KEY} --broadcast -vvv