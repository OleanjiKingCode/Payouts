import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { chain, configureChains } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import config from '../../../../../../../../../Documents/IQ/iq-ui/src/config/index'

type Connector = MetaMaskConnector | WalletConnectConnector
const chainArray =
  config.alchemyChain === 'goerli' ? [chain.goerli] : [chain.mainnet]
export const { chains, provider } = configureChains(chainArray, [
  alchemyProvider({ alchemyId: config.alchemyApiKey, weight: 1 }),
])

export const connectors: Connector[] = [
  new MetaMaskConnector({ chains, options: { shimDisconnect: true } }),
  new WalletConnectConnector({
    chains,
    options: {
      qrcode: true,
    },
  }),
]
