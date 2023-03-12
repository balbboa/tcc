import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import AuthProvider from "./contexts";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthProvider>
  );
}

export default MyApp;
