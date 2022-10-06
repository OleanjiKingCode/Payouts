import React from "react";
import {
  ButtonGroup,
  Button,
  Heading,
  Text,
  VStack,
  Stack,
  chakra,
} from "@chakra-ui/react";

export const HeroSection = () => {
  return (
    <Stack
      direction={{ base: "column", lg: "row" }}
      justify="space-between"
      w={{ base: "full", lg: "90vw", xl: "min(90%, 1150px)" }}
      mx="auto"
      px={{ base: 3, lg: 10 }}
      mt={{ base: 4, lg: 0 }}
    >
      <VStack
        alignItems={{ base: "center", lg: "start" }}
        textAlign={{ base: "center", lg: "start" }}
        spacing={4}
        mb={10}
        mt={5}
      >
        <Heading
          w={{ base: "90%", md: "100%" }}
          fontSize={{ base: "35", sm: "42", lg: "54" }}
          textAlign="center"
          pb={5}
        >
          IQ&apos;s Wiki <br />
          <chakra.span color="#FF5CAA"> Payouts</chakra.span>
        </Heading>
        <Text
          w="full"
          fontSize={{ base: "sm", md: "md", lg: "lg" }}
          textAlign="center"
          pb={10}
        >
          IQ wiki Editors Payment Platform.
        </Text>
        <ButtonGroup size="lg" spacing={{ base: 5, lg: 9 }}>
          <Button
            as="a"
            href="/Payouts"
            w={{ base: 32, lg: 40 }}
            bg="#FF5CAA"
            color="white"
            _hover={{ bg: "gray.100", color: "black" }}
          >
            Payouts
          </Button>
          <Button
            as="a"
            href="/lists"
            w={{ base: 32, lg: 40 }}
            variant="outline"
            bgColor="btnBgColor"
          >
            Payers List
          </Button>
        </ButtonGroup>
      </VStack>
      {/* <HeroCard wiki={wiki} /> */}
    </Stack>
  );
};
