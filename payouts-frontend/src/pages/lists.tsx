import {
  Table,
  Thead,
  Tbody,
  Text,
  Flex,
  Heading,
  chakra,
  Tr,
  Th,
  Td,
  Box,
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useMenuState,
  useToast,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import React, { useState } from "react";
import shortenAccount from "../utils/shortenAccount";
import { BigNumber, Signer, utils, constants, Contract } from "ethers";
import {
  useAccount,
  useContract,
  useContractRead,
  useContractWrite,
  useSigner,
} from "wagmi";
import { PAYERS_LIST } from "../components/types/payersType";
import { GET_PAYERS_LISTS } from "../components/Queries";
import { config } from "../config/index";
import { payoutAbi } from "../components/abis/payouts";
import { createClient } from "urql";

const client = createClient({
  url: config.PayoutsGraphApi,
});

type ListsProps = {
  listData: PAYERS_LIST[];
};

async function GetList() {
  const data = await client.query(GET_PAYERS_LISTS, undefined).toPromise();
  return data.data?.payers;
}

export async function getServerSideProps() {
  const data = await GetList();

  return {
    props: {
      lists: data ? data : [],
    },
  };
}

const Lists = (props: ListsProps) => {
  const { listData } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenRemove,
    onOpen: onOpenRemove,
    onClose: onCloseRemove,
  } = useDisclosure();
  const [newPayer, setNewPayer] = useState("");
  const [removePayer, setRemovePayer] = useState("");
  const { address, isConnected: isUserConnected } = useAccount();
  const toast = useToast();

  const { writeAsync: addAddress } = useContractWrite({
    addressOrName: config.PayoutsContractAddress,
    contractInterface: payoutAbi,
    functionName: "addAddress",
  });

  const { writeAsync: removeAddress } = useContractWrite({
    addressOrName: config.PayoutsContractAddress,
    contractInterface: payoutAbi,
    functionName: "removeAddress",
  });

  const addAddressToList = async (address: string) => {
    if (isUserConnected) {
      const add = await addAddress({ args: [address] });
      await add.wait();
      onClose();
    } else {
    }
  };

  const removeAddressFromList = async (address: string) => {
    if (isUserConnected) {
      const add = await removeAddress({ args: [address] });
      await add.wait();
      onCloseRemove();
      let toastTitle = "Payer address successfully added";

      toast({
        title: toastTitle,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else {
      let toastTitle = "You are not connected, Connect your wallet";

      toast({
        title: toastTitle,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box pt={10} mx={18}>
      <Flex direction="column" gap="6" pt="2" px={15} mb="8">
        <Flex direction="column" gap="1">
          <Heading fontWeight="bold" fontSize={{ md: "xl", lg: "2xl" }}>
            Payers Lists
          </Heading>
          <Text
            fontSize={{ base: "md", md: "lg" }}
            color="fadedText4"
            fontWeight="normal"
          >
            Lists of Eligible Payers.
          </Text>
        </Flex>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Adding New Payer</ModalHeader>
          <ModalCloseButton />
          <ModalBody py={6}>
            <FormControl>
              <Input
                type="text"
                placeholder="Paste address of payer's account"
                onChange={(e) => setNewPayer(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              fontSize="sm"
              px="4"
              fontWeight="medium"
              bg="#FF5CAA"
              color="white"
              onClick={() => addAddressToList(newPayer)}
              _hover={{ bg: "gray.100", color: "black" }}
              mr={3}
            >
              Add
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenRemove} onClose={onCloseRemove}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Removing Payer</ModalHeader>
          <ModalCloseButton />
          <ModalBody py={6}>
            <Text fontWeight="semibold" fontSize="16">
              Are you sure you want to remove this payer from the list?
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              fontSize="sm"
              px="4"
              fontWeight="medium"
              bg="#FF5CAA"
              color="white"
              onClick={() => removeAddressFromList(removePayer)}
              _hover={{ bg: "gray.100", color: "black" }}
              mr={3}
            >
              Remove
            </Button>
            <Button onClick={onCloseRemove}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        pb="20"
      >
        <chakra.div overflowX="auto" fontSize="sm" w="90%" textAlign="end">
          <Button
            onClick={onOpen}
            fontSize="sm"
            px="4"
            my="4"
            fontWeight="medium"
            bg="#FF5CAA"
            color="white"
            _hover={{ bg: "gray.100", color: "black" }}
          >
            Add New Payer
          </Button>
        </chakra.div>
        <chakra.div
          overflowX="auto"
          border="solid 1px"
          borderColor="divider2"
          rounded="lg"
          fontSize="sm"
          w="90%"
        >
          <Table size="md" variant="striped" colorScheme={"gray"}>
            <Thead>
              <Tr>
                <Th>S/N</Th>
                <Th>Address</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {listData?.map((payer, i) => {
                return (
                  <Tr key={i}>
                    <Td>{payer.id}</Td>
                    <Td>{payer.Address}</Td>
                    <Td>
                      <Td>
                        <Button
                          fontSize="sm"
                          px="4"
                          fontWeight="medium"
                          bg="#FF5CAA"
                          color="white"
                          onClick={() => {
                            setRemovePayer(payer.Address);
                            onOpenRemove();
                          }}
                          _hover={{ bg: "gray.300", color: "black" }}
                        >
                          Remove
                        </Button>
                      </Td>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </chakra.div>
      </Flex>
    </Box>
  );
};

export default Lists;
