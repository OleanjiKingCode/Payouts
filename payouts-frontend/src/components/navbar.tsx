import {
  Button,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuGroup,
  Spacer,
  Box,
  FlexProps,
  LinkOverlay,
  Text,
  chakra,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import NextLink from "next/link";
import { NETWORK_DATA } from "../data/NetworkData";
import { NetworkType } from "../types/NetworkType";
import { useAccount } from "wagmi";
import ProfileSubMenu from "./ProfileSubMenu";
import { BraindaoLogo } from "../components/braindao-logo";
import WalletConnect from "../components/WalletConnect";

export const Navbar = (props: FlexProps) => {
  const [openWalletConnect, setOpenWalletConnect] = useState<boolean>(false);
  const [currentNetwork, setCurrentNetwork] = useState<NetworkType>(
    NETWORK_DATA[0]
  );
  const { isConnected } = useAccount();

  const handleNetworkSwitch = (newNetwork: NetworkType) => {
    setCurrentNetwork(newNetwork);
  };

  return (
    <>
      <Flex
        boxSize="full"
        align="center"
        gap="2.5"
        py="17px"
        px={{ lg: "4" }}
        fontSize="sm"
        {...props}
      >
        <NextLink href="/" passHref>
          <Flex as="a" alignItems="center" gap="3" cursor="pointer">
            <BraindaoLogo />
            <Text fontWeight="bold" fontSize="lg">
              Editors Payouts
            </Text>
          </Flex>
        </NextLink>
        <Spacer />
        <NextLink href="/payouts" passHref>
          <Text
            fontWeight="bold"
            as="a"
            fontSize="lg"
            px={4}
            py={2}
            rounded="lg"
            _hover={{ bg: "gray.300", color: "black" }}
          >
            Payouts
          </Text>
        </NextLink>
        <NextLink href="/lists" passHref>
          <Text
            fontWeight="bold"
            as="a"
            fontSize="lg"
            px={4}
            py={2}
            rounded="lg"
            _hover={{ bg: "gray.300", color: "black" }}
          >
            Lists
          </Text>
        </NextLink>

        <Menu>
          <MenuButton
            as={Button}
            size="sm"
            fontWeight="500"
            variant="outline"
            leftIcon={<Icon as={currentNetwork.icon} fontSize="md" />}
            rightIcon={<FaChevronDown />}
          >
            <Text
              display={{ base: "none", md: "block" }}
              fontSize="sm"
              fontWeight="medium"
            >
              {currentNetwork.name}{" "}
            </Text>
          </MenuButton>
          <MenuList borderRadius="lg" w={250}>
            <MenuGroup
              fontSize="md"
              fontWeight="medium"
              title="Select Network "
            >
              {NETWORK_DATA.map((network, index) => (
                <Box px={3} key={index}>
                  <MenuItem
                    isDisabled={!network.isActive}
                    py={3}
                    my={3}
                    onClick={() => handleNetworkSwitch(network)}
                    rounded="lg"
                    border="solid 1px "
                    borderColor="divider"
                  >
                    <Icon mr={3} as={network.icon} fontSize="2xl" />
                    <Spacer />
                    <Text fontSize="sm" fontWeight="medium">
                      {network.name}
                    </Text>
                  </MenuItem>
                </Box>
              ))}
            </MenuGroup>
          </MenuList>
        </Menu>
        {!isConnected ? (
          <Button
            size="sm"
            onClick={() => setOpenWalletConnect(true)}
            fontSize="sm"
            px="4"
            fontWeight="medium"
            bg="#FF5CAA"
            color="white"
            _hover={{ bg: "gray.100", color: "black" }}
          >
            Connect Wallet
          </Button>
        ) : (
          <ProfileSubMenu />
        )}
      </Flex>
      <WalletConnect
        onClose={() => setOpenWalletConnect(false)}
        isOpen={openWalletConnect}
      />
    </>
  );
};
