import { chakra, Text } from "@chakra-ui/react";

export default function Footer() {
  return (
    <chakra.footer bg="gray.200" p={2} fontSize="sm" textAlign="center">
      <Text as="span">
        An app by <a href="mailto:camille.guy@gmail.com">Camille Guy</a>
      </Text>
      <Text as="span"> • </Text>
      <Text as="span">
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.freepik.com/free-vector/greeting-christmas-card-with-flat-christmas-objects_11053047.htm#query=secret%20santa&position=4&from_view=search&track=sph"
        >
          Image by BiZkettE1
        </a>{" "}
        on Freepik
      </Text>
    </chakra.footer>
  );
}
