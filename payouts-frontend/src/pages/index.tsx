import type { NextPage } from "next";
import Head from "next/head";
import { Navbar } from "../components/navbar";
import { HeroSection } from "../components/Landing/HeroSection";
import { chakra, Flex } from "@chakra-ui/react";
import { Stats } from "../components/Landing/stats";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>IQ Payouts</title>
        <meta name="description" content="IQ Editors Payouts" />
        <link rel="icon" href="" />
      </Head>
      <Flex direction="column" mx="auto" w="full">
        
        <chakra.div pt={{ base: 6, lg: 20 }}>
          <HeroSection />
          <Stats />
        </chakra.div>
      </Flex>
    </div>
  );
};

export default Home;
