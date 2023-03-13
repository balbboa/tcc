// React
import { useContext } from "react";
// Chakra UI
import {
  Box,
  Button,
  Flex,
  FlexProps,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
// Icones
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { FiChevronDown, FiMenu } from "react-icons/fi";
// Cookies
import { destroyCookie, parseCookies } from "nookies";
// Rotas
import Router from "next/router";
// Cores
import { GetServerSideProps } from "next";
import { AuthContext } from "../pages/contexts";
import { colors } from "../utils/colors";

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

// Sai da aplicação
export const logOff = (ctx?: never) => {
  destroyCookie(ctx, "nextauth.token");
  destroyCookie(ctx, "user");
  document.cookie =
    "nextauth.token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  Router.push("/");
};

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  // Hooks
  const { colorMode, toggleColorMode } = useColorMode();

  // Obtem o usuário logado
  const { user } = useContext(AuthContext);

  // JSX
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height={14}
      alignItems="center"
      bg={useColorModeValue("white", colors.grayHeader)}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.900")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      boxShadow={"md"}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        TCO
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <Button onClick={toggleColorMode}>
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{user?.name || "Carregando..."}</Text>
                  <Text fontSize="xs" color={"gray.400"}>
                    {user.organizations?.name || "Carregando..."}
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", colors.grayHeader)}
              borderColor={useColorModeValue("gray.200", "gray.800")}
              boxShadow={"lg"}
              zIndex={10}
            >
              <MenuItem>Alterar senha</MenuItem>
              <MenuDivider />
              <MenuItem onClick={() => logOff()}>Sair</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

export default MobileNav;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { ["nextauth.token"]: token } = parseCookies(context);

  // Verifica se o usuário está logado
  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
