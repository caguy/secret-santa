import { Box, chakra, Container } from "@chakra-ui/react";
import RawSantaSvg from "@/assets/santa.svg";
import Footer from "./Footer";

interface AppLayoutProps {
  children: React.ReactNode;
}

const SantaSvg = chakra(RawSantaSvg);

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <chakra.main flex={1}>
        <Container>
          <SantaSvg fill="accent" />
          <Box my={4}>{children}</Box>
        </Container>
      </chakra.main>
      <Footer />
    </Box>
  );
}
