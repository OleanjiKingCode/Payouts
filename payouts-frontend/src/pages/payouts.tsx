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
  useToast,
} from "@chakra-ui/react";
import { InferGetServerSidePropsType } from "next";
import React, { useState } from "react";
import shortenAccount from "../utils/shortenAccount";
import { PAYOUTS_LIST } from "../types/payoutsType";
import { GET_PAYOUTS_LISTS } from "../components/Queries";
import { BigNumber, Signer, utils, constants, Contract } from "ethers";
import { useAccount, useContractWrite } from "wagmi";
import { config } from "../config/index";
import { payoutAbi } from "../components/abis/payouts";
import { createClient } from "urql";
const client = createClient({
  url: config.PayoutsGraphApi,
});

export const getServerSideProps = async () => {
  const info = await client.query(GET_PAYOUTS_LISTS, undefined).toPromise();
  const data: PAYOUTS_LIST[] = info.data?.payoutsRecords;
  return {
    props: {
      payoutsData: data ? data : [],
    },
  };
};

function Payouts({
  payoutsData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const { address: currentUser, isConnected: isUserConnected } = useAccount();
  const toast = useToast();

  const { writeAsync: Single } = useContractWrite({
    addressOrName: config.PayoutsContractAddress,
    contractInterface: payoutAbi,
    functionName: "singlePayout",
  });

  const { writeAsync: Multiple } = useContractWrite({
    addressOrName: config.PayoutsContractAddress,
    contractInterface: payoutAbi,
    functionName: "multiplePayout",
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
          <ModalHeader>Making Payouts</ModalHeader>
          <ModalCloseButton />
          <ModalBody py={6}>
            <FormControl>
              <FormLabel>Token Address</FormLabel>
              <Input placeholder="Enter token address to be sent" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Receiver's Address </FormLabel>
              <Input placeholder="Enter wallet address " />
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
                <Th>Editors Address</Th>
                <Th>Date Paid</Th>
                <Th> Amount</Th>
              </Tr>
            </Thead>
            <Tbody>
              {payoutsData?.map((payout, i) => {
                return (
                  <Tr key={i}>
                    <>
                      <Td>{shortenAccount(payout.Receiver)}</Td>
                      <Td>{payout.Date}</Td>
                      <Td>{payout.Reward}</Td>
                    </>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </chakra.div>
      </Flex>
    </Box>
  );
}

export default Payouts;
