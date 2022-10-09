export const config = {
  alchemyApiKey: String(process.env.NEXT_PUBLIC_ALCHEMY_API_KEY),
  alchemyChain: "mumbai",
  chainId: "80001",
  chainName: "mumbai",
  PayoutsContractAddress:
    process.env.PAYOUTS_CONTRACT_ADDRERSS ||
    "0xCca2C72a79e4F3307caa469F12085Be6Fca2E15f",
  PayoutsGraphApi:
    process.env.PAYOUTS_GRAPH_API ||
    "https://api.thegraph.com/subgraphs/name/oleanjikingcode/payout",
};
