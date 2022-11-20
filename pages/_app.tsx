import { ChakraProvider } from "@chakra-ui/react";
import RawSantaSvg from "@/assets/santa.svg";
import type { AppProps } from "next/app";
import Head from "next/head";
import { theme } from "@/ui";
import { AppLayout } from "@/components";

export default function SecretSanta({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Secret Santa</title>
        <meta
          name="description"
          content="Organise ton Secret Santa en un clic"
        />
      </Head>
      <ChakraProvider theme={theme}>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </ChakraProvider>
    </>
  );
}
