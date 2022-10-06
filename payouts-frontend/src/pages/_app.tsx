import React, { StrictMode } from "react";
import { ChakraProvider, createStandaloneToast } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Fonts from "../components/theme/Fonts";
import { createClient, WagmiConfig } from "wagmi";
import { connectors, provider } from "../config/wagmi";
// import { UALProviderSwitch, WalletProvider } from '@/context/eosWalletContext'

type CreateClientArgs = NonNullable<Parameters<typeof createClient>[number]>;
type CreateClientConnectors = CreateClientArgs["connectors"];
const createClientConnectors = connectors as CreateClientConnectors;

const client = createClient({
  autoConnect: true,
  connectors: createClientConnectors,
  provider,
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider resetCSS>
      <Fonts />
      <WagmiConfig client={client}>
        {/* <UALProviderSwitch>
          <WalletProvider> */}
        <Component {...pageProps} />
        {/* </WalletProvider>
        </UALProviderSwitch> */}
      </WagmiConfig>
    </ChakraProvider>
  );
};

export default MyApp;
