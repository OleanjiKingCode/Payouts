import React, { StrictMode } from "react";
import { chakra, ChakraProvider, createStandaloneToast } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Fonts from "../components/theme/Fonts";
import { createClient, WagmiConfig } from "wagmi";
import { connectors, provider } from "../config/wagmi";
import { Navbar } from "../components/navbar";
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
        <chakra.div w="full">
          <chakra.div
            h="4.375em"
            borderBottomColor="divider"
            borderBottomWidth="1px"
            pos="sticky"
            top="0"
            px="6"
            transition="box-shadow 0.2s"
            backdropFilter="blur(2px)"
            bg="bodyBg"
            zIndex="sticky"
          >
            <Navbar />
            <Component {...pageProps} />
          </chakra.div>
        </chakra.div>

        {/* </WalletProvider>
        </UALProviderSwitch> */}
      </WagmiConfig>
    </ChakraProvider>
  );
};

export default MyApp;
