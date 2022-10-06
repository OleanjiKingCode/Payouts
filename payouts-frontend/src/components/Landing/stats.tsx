import StakeCard from "../StakeCard";

import { Heading, Text, SimpleGrid, Box } from "@chakra-ui/react";
import React from "react";

export const Stats = () => {
  const bStyles = {
    borderLeft: "solid 1px",
    borderColor: "divider2",
  };

  return (
    <Box
      mt={10}
      px={{ base: 3, md: 8 }}
      py={{ base: 5, md: 20 }}
      textAlign="center"
    >
      <Heading
        textAlign="center"
        mb={4}
        fontWeight="700"
        fontSize={{ base: "2xl", lg: 43 }}
      >
        Payouts Stats
      </Heading>
      <Text
        color="homeDescriptionColor"
        fontSize={{ base: "sm", lg: 18 }}
        mx="auto"
        mb={9}
        px={4}
        maxW="750"
      >
        Details Of All Previous Payouts
      </Text>
      <Box maxW="1160px" mx="auto">
        <SimpleGrid
          columns={{ base: 2, md: 3 }}
          px={{ base: "8", md: "2" }}
          py="3"
          mt="7"
          spacingY="13px"
          border="solid 1px"
          borderColor="divider"
          rounded="lg"
          bg="cardBg2"
        >
          <StakeCard title="Total Number of Payments " value="349,391" />

          <StakeCard
            title="Total Value Of Payments Made"
            value="$1.4M"
            {...bStyles}
          />
          <StakeCard
            title="Number Of Paid Editors"
            value="3,128"
            {...bStyles}
          />
        </SimpleGrid>
      </Box>
    </Box>
  );
};
