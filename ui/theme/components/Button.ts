import { defineStyleConfig } from "@chakra-ui/react";

export default defineStyleConfig({
  baseStyle: {
    borderRadius: "base",
  },
  sizes: {
    sm: {
      p: 1,
    },
    md: {
      py: 2,
      px: 4,
    },
  },
  variants: {
    outline: {
      border: "1px solid",
      borderColor: "accent",
      color: "accent",
      _hover: {
        bg: "accent.lightest",
      },
    },
    solid: {
      bg: "accent",
      color: "white",
      _hover: {
        bg: "accent.light",
      },
    },
  },
  defaultProps: {
    variant: "solid",
    size: "md",
  },
});
