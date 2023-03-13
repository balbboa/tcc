// Chakra UI
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  useToast,
  useColorMode,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import Head from "next/head";
// NextJS
import Image from "next/image";
import Router from "next/router";
// Cookies
import { parseCookies } from "nookies";
// React
import { useContext, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
// Imagens
import LogoDark from "../assets/images/logo_dark.png";
import Logo from "../assets/images/logo_light.png";
// Cores
import { colors } from "../utils/colors";
// Auth
import { AuthContext } from "./contexts";

const Login = () => {
  // Hooks
  const [login, setLogin] = useState({
    email: "arthur@email.com",
    password: "string",
  });
  const { colorMode } = useColorMode();

  // Login
  const { signIn } = useContext(AuthContext);
  //Toast
  const toast = useToast();

  // Funções
  const handleLogin = async () => {
    const result = await signIn(login);
    if (result) {
      Router.push("/inicio");
    } else {
      toast({
        title: `Ocorreu um erro!`,
        description: "Usuário ou senha incorretos, por favor tente novamente",
        position: "top-right",
        isClosable: true,
        status: "error",
      });
    }
  };

  return (
    <>
      <GlobalStyle />
      <BackgroundImage />
      <Head>
        <title>TCO :: Login ::</title>
      </Head>
      <Flex minH={"100vh"} align={"center"} justify={"center"}>
        <Stack spacing={8} mx={"auto"} w={450} maxW={800} py={12} px={6}>
          <Stack align={"center"}>
            <Box
              boxShadow="dark-lg"
              rounded="full"
              borderRadius="full"
              boxSize="150px"
              p={4}
              bg={useColorModeValue("white", colors.grayWolf)}
            >
              <Image
                src={colorMode === "dark" ? Logo : LogoDark}
                height={150}
                width={150}
                alt="Sentinela Logo"
              />
            </Box>
            <Heading
              fontSize={"4xl"}
              style={{ marginTop: 20 }}
              color={useColorModeValue("gray.200", "gray.300")}
            >
              TCO
            </Heading>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", colors.grayWolf)}
            boxShadow={"dark-lg"}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={login.email}
                  onChange={(data) =>
                    setLogin({ ...login, email: data.currentTarget.value })
                  }
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Senha</FormLabel>
                <Input
                  type="password"
                  value={login.password}
                  onChange={(data) =>
                    setLogin({ ...login, password: data.currentTarget.value })
                  }
                />
              </FormControl>
              <Stack spacing={10}>
                <Button
                  bg={useColorModeValue("gray", colors.graySky)}
                  color={"white"}
                  _hover={{
                    bg: colors.graySkyHover,
                  }}
                  onClick={() => handleLogin()}
                >
                  ENTRAR
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};

// Estilização

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #292929;
  }
`;

const BackgroundImage = styled.div`
  background-image: url("images/bg.jpg");
  position: absolute;
  z-index: -1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0.2;
  width: 100%;
  height: 100%;
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
`;

export default Login;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { ["nextauth.token"]: token } = parseCookies(context);

  if (token) {
    return {
      redirect: {
        destination: "/inicio",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
