import { NB_MAX_PARTICIPANTS } from "@/settings";
import { SantaForm } from "@/components";
import { Box, Heading, Text } from "@chakra-ui/react";

export default function Home() {
  return (
    <>
      <Heading as="h1">Organisez votre Secret Santa</Heading>
      <Text textStyle="p">
        Ajoutez jusqu&apos;à {NB_MAX_PARTICIPANTS} participants à votre Secret
        Santa, l&apos;application se charge du tirage au sort et de le
        communiquer individuellement aux participants en toute discrétion !
      </Text>
      <Box mt={4}>
        <SantaForm />
      </Box>
    </>
  );
}
