import { Box, chakra, ChakraProvider, Container } from "@chakra-ui/react";
import RawSantaSvg from "@/assets/santa.svg";
import type { AppProps } from "next/app";
import Head from "next/head";
import { theme } from "@/ui";

const SantaSvg = chakra(RawSantaSvg);

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
        <Box minHeight="100vh" display="flex" flexDirection="column">
          <chakra.main flex={1}>
            <Container>
              <SantaSvg fill="accent" />
              <Box my={4}>
                <Component {...pageProps} />
              </Box>
            </Container>
          </chakra.main>
          <chakra.footer bg="gray.200" textAlign="center" p={2} fontSize="sm">
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.freepik.com/free-vector/greeting-christmas-card-with-flat-christmas-objects_11053047.htm#query=secret%20santa&position=4&from_view=search&track=sph"
            >
              Image by BiZkettE1
            </a>{" "}
            on Freepik
          </chakra.footer>
        </Box>
      </ChakraProvider>
    </>
  );
}
