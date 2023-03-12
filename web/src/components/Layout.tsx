import React, { ReactNode } from "react";
import {
  Box,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
} from "@chakra-ui/react";
import { colors } from "../utils/colors";
// Siderbar
import SidebarContent from "./Sidebar";
// Navbar
import MobileNav from "./MobileNav";
// Head
import Head from "next/head";

interface ILayout {
  props: {
    title: string;
  };
  children: ReactNode;
}

export default function Layout({ children, props }: ILayout) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const pageTitle = `SENTINELA :: ${props.title} ::`;
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <Box minH="100vh" bg={useColorModeValue("gray.100", colors.graySky)}>
        {/* Sidebar */}
        <SidebarContent
          onClose={() => onClose}
          display={{ base: "none", md: "block" }}
        />
        <Drawer
          autoFocus={false}
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}
          size="full"
        >
          <DrawerContent>
            <SidebarContent onClose={onClose} />
          </DrawerContent>
        </Drawer>
        {/* Header */}
        <MobileNav onOpen={onOpen} />
        {/* Container */}
        <Box ml={{ base: 0, md: 60 }} p="4">
          {children}
        </Box>
      </Box>
    </>
  );
}
