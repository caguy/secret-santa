import { chakra, Link, Text } from "@chakra-ui/react";

export default function Footer() {
  return (
    <chakra.footer bg="gray.200" p={2} fontSize="xs" textAlign="center">
      <Text as="span">
        An app by <Link href="mailto:camille.guy@gmail.com">Camille Guy</Link>
      </Text>
      <Text as="span" whiteSpace="pre">
        {"  •  "}
      </Text>
      <Text as="span">
        Hosted on{" "}
        <Link target="_blank" rel="noreferrer" href="https://vercel.com/">
          Vercel
        </Link>
      </Text>
      <Text as="span" whiteSpace="pre">
        {"  •  "}
      </Text>
      <Text as="span">
        <Link
          target="_blank"
          rel="noreferrer"
          href="https://www.freepik.com/free-vector/greeting-christmas-card-with-flat-christmas-objects_11053047.htm#query=secret%20santa&position=4&from_view=search&track=sph"
        >
          Image by BiZkettE1
        </Link>{" "}
        on Freepik
      </Text>
    </chakra.footer>
  );
}
