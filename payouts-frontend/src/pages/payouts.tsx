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
  FormLabel,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import React from "react";
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

const Payouts: NextPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { address } = useAccount();
  const { data: signer } = useSigner();

  const { writeAsync: mint } = useContractWrite({
    addressOrName: config.PayoutsContractAddress,
    contractInterface: payoutAbi,
    functionName: "mint",
  });
 

  return (
    <Box pt={10} mx={18}>
      <Flex direction="column" gap="6" pt="2" px={15} mb="8">
        <Flex direction="column" gap="1">
          <Heading fontWeight="bold" fontSize={{ md: "xl", lg: "2xl" }}>
            Payouts
          </Heading>
          <Text
            fontSize={{ base: "md", md: "lg" }}
            color="fadedText4"
            fontWeight="normal"
          >
            Payments sents to editors.
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
              <FormLabel>Token Address</FormLabel>
              <Input placeholder="Enter token address to be sent" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Amount of tokens </FormLabel>
              <Input placeholder="Enter amount of tokens " />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              fontSize="sm"
              px="4"
              fontWeight="medium"
              bg="#FF5CAA"
              color="white"
              _hover={{ bg: "gray.100", color: "black" }}
              mr={3}
            >
              Send
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Flex direction="column" alignItems="center" justifyContent="center">
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
            Make New Payment
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
                <Th>Editors Address</Th>
                <Th>Date Paid</Th>
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
                <Td>July 23 2022</Td>
              </Tr>
              <Tr>
                <Td>2</Td>
                <Td>
                  {" "}
                  {shortenAccount("0xB35Adb972365309e545dDEED8Ea3DCA648226819")}
                </Td>
                <Td>May 16 2022</Td>
              </Tr>
              <Tr>
                <Td>3</Td>
                <Td>
                  {shortenAccount("0xcF4E7c44d50b8de9796f236987E8729a6A5c0fe0")}
                </Td>
                <Td>Jan. 03 2023</Td>
              </Tr>
              <Tr>
                <Td>4</Td>
                <Td>
                  {shortenAccount("0xfC86A332E9285DF9515B90a476B95FB0a73C31c5")}
                </Td>
                <Td>Nov.. 11 2022</Td>
              </Tr>
              <Tr>
                <Td>5</Td>
                <Td>
                  {shortenAccount("0xf2445f8FEEfef350ac1756F67C62938a37eDa375")}
                </Td>
                <Td>Oct. 30 2022</Td>
              </Tr>
            </Tbody>
          </Table>
        </chakra.div>
      </Flex>
    </Box>
  );
};

export default Payouts;
