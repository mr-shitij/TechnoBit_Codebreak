// Chakra imports
import { Avatar, Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "components/card/Card.js";
import React from "react";

export default function Banner(props) {
  const { banner, avatar, name, job, posts, followers, following } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const borderColor = useColorModeValue(
    "white !important",
    "#111C44 !important"
  );
  return (
    <Card mb={{ base: "0px", lg: "20px" }} align='center'>
      <Box
        bg={`url(${banner})`}
        bgSize='cover'
        borderRadius='16px'
        h='131px'
        w='100%'
      />
      <Avatar
        mx='auto'
        src={avatar}
        h='87px'
        w='87px'
        mt='-43px'
        border='4px solid'
        borderColor={borderColor}
      />
      <Text color={textColorPrimary} fontWeight='bold' fontSize='xl' mt='10px'>
        {name}
      </Text>
      <Text color={textColorSecondary} fontSize='sm'>
        Dispatch Servicemen
      </Text>
      <Flex w='max-content' mx='auto' mt='26px'>
        <Flex mx='auto' me='60px' align='center' direction='column'>
          {/* <Text color={textColorPrimary} fontSize='2xl' fontWeight='700'>
            Past Dispatchs
          </Text> */}
          <Text color={textColorSecondary} fontSize='sm' fontWeight='400'>
          Past Dispatchs
          </Text>
        </Flex>
        <Flex mx='auto' me='60px' align='center' direction='column'>
          {/* <Text color={textColorPrimary} fontSize='2xl' fontWeight='700'>
          Drivers
          </Text> */}
          <Text color={textColorSecondary} fontSize='sm' fontWeight='400'>
            Drivers
          </Text>
        </Flex>
        <Flex mx='auto' align='center' direction='column'>
          {/* <Text color={textColorPrimary} fontSize='2xl' fontWeight='700'>
            Remaining Dispatchs
          </Text> */}
          <Text color={textColorSecondary} fontSize='sm' fontWeight='400'>
          Remaining Dispatchs
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
}
