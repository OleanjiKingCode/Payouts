import React, { useEffect, useState } from "react";
import {
  Button,
  Divider,
  Flex,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
  IconProps,
  useClipboard,
  FlexProps,
  chakra,
  ComponentWithAs,
  Icon,
} from "@chakra-ui/react";
import {
  RiLogoutBoxLine,
  RiExternalLinkLine,
  RiFileCopyLine,
} from "react-icons/ri";
import DisplayAvatar from "../components/Avatar";
import shortenAccount from "../utils/shortenAccount";
import { useAccount, useDisconnect } from "wagmi";
import { FaChevronDown } from "react-icons/fa";
import { IconType } from "react-icons/lib";
import { CheckIcon } from "@chakra-ui/icons";

type SubMenuItemProps = {
  label: string;
  action?: () => void;
  icon: IconType | ComponentWithAs<"svg">;
} & FlexProps;

const SubMenuItem = (props: SubMenuItemProps) => {
  const { icon, label, action, ...rest } = props;
  return (
    <Flex
      align="center"
      color="fadedText4"
      onClick={action}
      px="6"
      py="2.5"
      gap="2"
      cursor="pointer"
      {...rest}
    >
      <Icon as={icon} boxSize="6" />
      <Text fontWeight="bold">{label}</Text>
    </Flex>
  );
};

type TokenItemProps = {
  symbol?: string;
  icon: (props: IconProps) => JSX.Element;
  amount: number;
};

const ProfileSubMenu = () => {
  const { address, connector } = useAccount();
  const { disconnect } = useDisconnect();
  const logout = () => {
    disconnect();
  };

  const { hasCopied, onCopy: copyAddress } = useClipboard(address as string);

  return (
    <Popover>
      <PopoverTrigger>
        <Button
          size="md"
          fontWeight="500"
          variant="outline"
          leftIcon={
            <DisplayAvatar
              svgProps={{ rounded: "full" }}
              size={20}
              address={address}
            />
          }
          fontSize="sm"
          rightIcon={<FaChevronDown />}
        >
          {address && shortenAccount(address)}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        pt="5"
        pb="6"
        bg="white"
        w="355px"
        mr={{ md: "13", lg: "16" }}
      >
        <chakra.div mx="6" pb="5">
          <Text fontWeight="bold">My Wallet</Text>
          <Flex mt="3" align="center" gap="2.5">
            <chakra.div pos="relative">
              <DisplayAvatar
                svgProps={{ rounded: "full" }}
                size={40}
                address={address}
              />
              <chakra.div
                boxSize="4"
                bg="green.500"
                pos="absolute"
                bottom="-1"
                rounded="full"
                right="1"
                border="solid 4px"
                borderColor="white"
              />
            </chakra.div>
            <Flex direction="column" align="space-between">
              <Text fontWeight="bold" maxW="110px" noOfLines={1}>
                {address}
              </Text>
              <Text color="dimmedText" fontWeight="semibold">
                {connector?.name}
              </Text>
            </Flex>
          </Flex>
        </chakra.div>
        <Divider mb="6" />
        <SubMenuItem
          label="Copy Address"
          action={copyAddress}
          icon={RiFileCopyLine}
          {...(hasCopied && {
            color: "green",
            icon: CheckIcon,
          })}
        />
        <SubMenuItem
          label="View on Etherscan"
          action={() =>
            window.open(`https://etherscan.io/address/${address}`, "_blank")
          }
          icon={RiExternalLinkLine}
        />
        <SubMenuItem
          label="Disconnect"
          action={logout}
          icon={RiLogoutBoxLine}
        />
      </PopoverContent>
    </Popover>
  );
};

export default ProfileSubMenu;
