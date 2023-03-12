import { Box, Heading, useColorModeValue } from "@chakra-ui/react";
import { ReactNode } from "react";
import { colors } from "../utils/colors";

interface ICard {
  children: ReactNode;
  props: {
    title: string;
    maxW?: number;
  };
}

const Card = ({ children, props }: ICard) => {
  return (
    <>
      <Heading
        color={useColorModeValue("gray.700", "white")}
        fontSize={"2xl"}
        fontFamily={"body"}
        mt={5}
        mb={5}
      >
        {props.title}
      </Heading>
      <Box
        role={"group"}
        maxW={props.maxW}
        bg={useColorModeValue("white", colors.grayWolf)}
        boxShadow={"md"}
        rounded={"lg"}
        pos={"relative"}
        zIndex={1}
      >
        {children}
      </Box>
    </>
  );
};

export default Card;
