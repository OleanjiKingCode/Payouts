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
import { config } from "../config/index";
import { payoutAbi } from "../components/abis/payouts";

const Lists: NextPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenRemove,
    onOpen: onOpenRemove,
    onClose: onCloseRemove,
  } = useDisclosure();
  const [newPayer, setNewPayer] = useState("");
  const { address } = useAccount();
  const { data: signer } = useSigner();

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
    const add = await addAddress({ args: [address] });
    await add.wait();
  };

  const removeAddressFromList = async (address: string) => {
    const add = await removeAddress({ args: [address] });
    await add.wait();
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
              onClick={() => removeAddressFromList(newPayer)}
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
              <Tr>
                <Td>1</Td>
                <Td>
                  {" "}
                  {shortenAccount(
                    "0x027D704225f61176EF49D7d717bE3349f37384A2"
                  )}{" "}
                </Td>

                <Td>
                  <Button
                    fontSize="sm"
                    px="4"
                    fontWeight="medium"
                    bg="#FF5CAA"
                    color="white"
                    onClick={onOpenRemove}
                    _hover={{ bg: "gray.300", color: "black" }}
                  >
                    Remove
                  </Button>
                </Td>
              </Tr>
              <Tr>
                <Td>2</Td>
                <Td>
                  {" "}
                  {shortenAccount("0xB35Adb972365309e545dDEED8Ea3DCA648226819")}
                </Td>

                <Td>
                  <Button
                    fontSize="sm"
                    px="4"
                    fontWeight="medium"
                    bg="#FF5CAA"
                    color="white"
                    onClick={onOpenRemove}
                    _hover={{ bg: "gray.300", color: "black" }}
                  >
                    Remove
                  </Button>
                </Td>
              </Tr>
              <Tr>
                <Td>3</Td>
                <Td>
                  {shortenAccount("0xcF4E7c44d50b8de9796f236987E8729a6A5c0fe0")}
                </Td>

                <Td>
                  <Button
                    fontSize="sm"
                    px="4"
                    fontWeight="medium"
                    bg="#FF5CAA"
                    color="white"
                    onClick={onOpenRemove}
                    _hover={{ bg: "gray.300", color: "black" }}
                  >
                    Remove
                  </Button>
                </Td>
              </Tr>
              <Tr>
                <Td>4</Td>
                <Td>
                  {shortenAccount("0xfC86A332E9285DF9515B90a476B95FB0a73C31c5")}
                </Td>

                <Td>
                  <Button
                    fontSize="sm"
                    px="4"
                    fontWeight="medium"
                    bg="#FF5CAA"
                    color="white"
                    onClick={onOpenRemove}
                    _hover={{ bg: "gray.300", color: "black" }}
                  >
                    Remove
                  </Button>
                </Td>
              </Tr>
              <Tr>
                <Td>5</Td>
                <Td>
                  {shortenAccount("0xf2445f8FEEfef350ac1756F67C62938a37eDa375")}
                </Td>

                <Td>
                  <Button
                    fontSize="sm"
                    px="4"
                    fontWeight="medium"
                    bg="#FF5CAA"
                    color="white"
                    onClick={onOpenRemove}
                    _hover={{ bg: "gray.300", color: "black" }}
                  >
                    Remove
                  </Button>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </chakra.div>
      </Flex>
    </Box>
  );
};

export default Lists;
