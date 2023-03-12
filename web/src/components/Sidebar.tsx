// Chakra UI
import {
  Box,
  BoxProps, CloseButton, Flex, FlexProps, Icon, Link, Text, useColorMode, useColorModeValue
} from "@chakra-ui/react";
// React
import { ReactNode } from "react";
// NextJS
import Image from "next/image";
import Router from "next/router";
// Icones
import { IconType } from "react-icons";
import { AiOutlineFlag } from "react-icons/ai";
import { BiBuilding } from "react-icons/bi";
import { CgTimer } from "react-icons/cg";
import { FiHome, FiSettings, FiUsers } from "react-icons/fi";
import { VscSignOut } from "react-icons/vsc";

// Cores
import { colors } from "../utils/colors";
import { logOff } from "./MobileNav";
// Imagens
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import LogoDark from "../assets/images/logo_dark.png";
import Logo from "../assets/images/logo_light.png";
import { TUser } from "../pages/contexts";

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

interface LinkItemProps {
  name: string;
  icon: IconType;
  path: string;
}

// Link do Menu lateral esquerdo
const LinkItems: Array<LinkItemProps> =
  [
    { name: "Início", icon: FiHome, path: "/" },
    {
      name: "Eventos em espera",
      icon: CgTimer,
      path: "/eventos/espera",
    },
    { name: "Pessoas", icon: FiUsers, path: "/pessoas" },
    { name: "Facções", icon: AiOutlineFlag, path: "/faccoes" },
    { name: "Organizações", icon: BiBuilding, path: "/organizacoes" },
    { name: "Sistema", icon: FiSettings, path: "/sistema" },
    { name: "Sair", icon: VscSignOut, path: "" },
  ];


const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {

  const { colorMode } = useColorMode();
  return (
    <Box
      bg={useColorModeValue("white", colors.grayWolf)}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.900")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      boxShadow={"md"}
      {...rest}
    >
      <Flex alignItems="center" mx="8" justifyContent="space-between">
        <Flex
          alignItems={"center"}
          flexDirection={"column"}
          mt={3}
          w={{ base: 180, md: 200 }}
        >
          <Image
            src={colorMode === "dark" ? Logo : LogoDark}
            height={80}
            width={80}
            alt="Sentinela Logo"
          />
          <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
            SENTINELA
          </Text>
        </Flex>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem
          key={link.name}
          icon={link.icon}
          onClick={() =>
            link.name === "Sair" ? logOff() : Router.push(link.path)
          }
          display={
            link.name === "Sair" ? { base: "flex", md: "none" } : { md: "flex" }
          }
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactNode;
}
const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Link
      href="#"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: useColorModeValue(colors.graySky, colors.graySkyHover),
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

export default SidebarContent;

export const getServerSideProps: GetServerSideProps = async () => {

  const { user: user } = parseCookies();
  const parseUser = JSON.parse(user);
  const userSession: TUser = parseUser;

  return {
    props: { userSession },
  };
};