import { extendTheme } from "@chakra-ui/react";
import Button from "./components/Button";
import FormLabel from "./components/FormLabel";
import textStyles from "./foundations/textStyles";
import semanticTokens from "./foundations/semanticTokens";
import global from "./styles/global";

export default extendTheme({
  styles: { global },
  textStyles,
  semanticTokens,
  components: { Button, FormLabel },
});
